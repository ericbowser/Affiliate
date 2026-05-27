/**
 * Detector Match — Pure Scoring Engine
 *
 * Framework-free. No React. No DOM. No side effects.
 * Same pattern as Boxes.js geometry engine: math/logic is decoupled from UI.
 *
 * Single Responsibility:  Only scores detectors against quiz answers.
 * Open/Closed:            Add detectors via data, add scoring rules via SCORING_RULES.
 *                         Never modify scoreDetector for new detectors or questions.
 * Liskov:                 Every detector must conform to DetectorAttrs (see JSDoc).
 * Interface Segregation:  Consumers call recommendDetectors() — they don't see internals.
 * Dependency Inversion:   UI depends on this abstraction, not on data shape.
 *
 * @module engine
 */

/**
 * @typedef {Object} DetectorAttrs
 * @property {string} id                                     - Product id (matches products.js)
 * @property {number} priceNumeric                           - Price in USD (no $, no commas)
 * @property {('beginner'|'some'|'experienced')[]} bestForExperience
 * @property {('coins-jewelry'|'relics'|'gold'|'nuggets'|'all-around')[]} specialties
 * @property {number} waterproofDepth                        - feet; 0 = not waterproof
 * @property {number} weightLbs
 * @property {('simple'|'digital'|'advanced')} techLevel
 * @property {('mineralized-desert'|'creek'|'beach'|'fields'|'mixed')[]} terrainStrengths
 * @property {boolean} multiFrequency
 * @property {string} pitchAngle                             - 1-sentence "why this detector" copy
 */

/**
 * @typedef {Object} QuizAnswers
 * @property {('under-300'|'300-500'|'500-800'|'800-plus')} budget
 * @property {('beginner'|'some'|'experienced')} experience
 * @property {('coins-jewelry'|'relics'|'gold'|'all-around')} primaryUse
 * @property {('mineralized-desert'|'creek'|'fields'|'mixed')} terrain
 * @property {('never'|'shallow'|'submerged')} waterUse
 * @property {('simple'|'digital'|'advanced')} tech
 */

/**
 * @typedef {Object} ScoreResult
 * @property {DetectorAttrs} detector
 * @property {number} score                                  - Higher = better match. -Infinity = disqualified.
 * @property {string[]} matches                              - Reasons this detector matched.
 */

/**
 * @typedef {Object} Recommendation
 * @property {ScoreResult|null} primary                      - Best match
 * @property {ScoreResult|null} runnerUp                     - Second best (different vibe)
 * @property {ScoreResult[]} all                             - All scored detectors, desc by score
 */

const BUDGET_RANGES = {
  'under-300': [0, 300],
  '300-500': [300, 500],
  '500-800': [500, 800],
  '800-plus': [800, Infinity],
};

const BUDGET_OVER_TOLERANCE = 1.15; // 15% over budget = still in the running, just lower score
const HARD_OUT_OF_BUDGET = 1.5;     // 50% over = hard disqualify

const POINTS = {
  budgetExact: 25,
  budgetUnder: 15,
  budgetSlightlyOver: 5,
  experienceMatch: 20,
  specialtyMatch: 25,
  specialtyAllAroundFallback: 12,
  terrainMatch: 20,
  waterShallow: 12,
  waterSubmerged: 15,
  techExact: 10,
  techAdjacent: 5,
  lightweightBonus: 5,
};

const LABELS = {
  budget: {
    'under-300': 'under $300',
    '300-500': '$300–$500',
    '500-800': '$500–$800',
    '800-plus': 'over $800',
  },
  experience: {
    'beginner': 'beginner',
    'some': 'intermediate',
    'experienced': 'experienced',
  },
  primaryUse: {
    'coins-jewelry': 'coins & jewelry',
    'relics': 'relics & history',
    'gold': 'gold prospecting',
    'all-around': 'all-around hunting',
  },
  terrain: {
    'mineralized-desert': 'mineralized desert soil',
    'creek': 'creeks and streams',
    'fields': 'open fields',
    'mixed': 'mixed terrain',
  },
};

/**
 * Score a single detector against quiz answers.
 * Pure function — no side effects.
 *
 * @param {DetectorAttrs} detector
 * @param {QuizAnswers} answers
 * @returns {ScoreResult}
 */
export function scoreDetector(detector, answers) {
  const matches = [];
  let score = 0;

  // --- Budget — soft scoring with hard upper bound ---
  const [budgetLow, budgetHigh] = BUDGET_RANGES[answers.budget];

  if (budgetHigh !== Infinity && detector.priceNumeric > budgetHigh * HARD_OUT_OF_BUDGET) {
    return { detector, score: -Infinity, matches: [] }; // way over budget — disqualify
  }

  if (detector.priceNumeric >= budgetLow && detector.priceNumeric <= budgetHigh) {
    score += POINTS.budgetExact;
    matches.push(`fits your ${LABELS.budget[answers.budget]} budget at $${detector.priceNumeric}`);
  } else if (detector.priceNumeric < budgetLow) {
    score += POINTS.budgetUnder;
    matches.push(`under budget at $${detector.priceNumeric} — leaves money for accessories`);
  } else if (budgetHigh !== Infinity && detector.priceNumeric <= budgetHigh * BUDGET_OVER_TOLERANCE) {
    score += POINTS.budgetSlightlyOver;
    matches.push(`slightly over budget at $${detector.priceNumeric} but worth the stretch`);
  }

  // --- Experience match ---
  if (detector.bestForExperience.includes(answers.experience)) {
    score += POINTS.experienceMatch;
    matches.push(`built for ${LABELS.experience[answers.experience]} users`);
  }

  // --- Primary use / specialty ---
  if (detector.specialties.includes(answers.primaryUse)) {
    score += POINTS.specialtyMatch;
    matches.push(`strong for ${LABELS.primaryUse[answers.primaryUse]}`);
  } else if (detector.specialties.includes('all-around')) {
    score += POINTS.specialtyAllAroundFallback;
  }

  // --- Terrain ---
  if (detector.terrainStrengths.includes(answers.terrain)) {
    score += POINTS.terrainMatch;
    matches.push(`tuned for ${LABELS.terrain[answers.terrain]}`);
  }

  // --- Water use — HARD requirements ---
  if (answers.waterUse === 'submerged') {
    if (detector.waterproofDepth < 10) return { detector, score: -Infinity, matches: [] };
    score += POINTS.waterSubmerged;
    matches.push(`fully submersible to ${detector.waterproofDepth} ft`);
  } else if (answers.waterUse === 'shallow') {
    if (detector.waterproofDepth < 3) return { detector, score: -Infinity, matches: [] };
    score += POINTS.waterShallow;
    matches.push('waterproof for creek wading');
  }

  // --- Tech preference ---
  if (detector.techLevel === answers.tech) {
    score += POINTS.techExact;
  } else if (isAdjacentTech(detector.techLevel, answers.tech)) {
    score += POINTS.techAdjacent;
  }

  // --- Weight bonus for lighter detectors ---
  if (detector.weightLbs <= 2.8) {
    score += POINTS.lightweightBonus;
  }

  return { detector, score, matches };
}

/**
 * Whether two tech levels are adjacent on the simple → digital → advanced spectrum.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function isAdjacentTech(a, b) {
  const order = ['simple', 'digital', 'advanced'];
  return Math.abs(order.indexOf(a) - order.indexOf(b)) === 1;
}

/**
 * Recommend detectors for a set of quiz answers.
 * This is the only function the UI should consume.
 *
 * @param {DetectorAttrs[]} detectors
 * @param {QuizAnswers} answers
 * @returns {Recommendation}
 */
export function recommendDetectors(detectors, answers) {
  if (!detectors?.length) return { primary: null, runnerUp: null, all: [] };

  const scored = detectors
    .map(d => scoreDetector(d, answers))
    .filter(r => r.score > -Infinity)
    .sort((a, b) => b.score - a.score);

  return {
    primary: scored[0] || null,
    runnerUp: scored[1] || null,
    all: scored,
  };
}

/**
 * Validate that a detector object conforms to DetectorAttrs.
 * Useful for tests and CI checks.
 * @param {any} d
 * @returns {string[]} array of error messages, empty if valid
 */
export function validateDetectorAttrs(d) {
  const errors = [];
  const required = [
    'id', 'priceNumeric', 'bestForExperience', 'specialties',
    'waterproofDepth', 'weightLbs', 'techLevel', 'terrainStrengths',
    'multiFrequency', 'pitchAngle',
  ];
  for (const key of required) {
    if (d[key] === undefined) errors.push(`Missing: ${key}`);
  }
  if (typeof d.priceNumeric !== 'number') errors.push('priceNumeric must be a number');
  if (!Array.isArray(d.bestForExperience)) errors.push('bestForExperience must be an array');
  if (!Array.isArray(d.specialties)) errors.push('specialties must be an array');
  if (!Array.isArray(d.terrainStrengths)) errors.push('terrainStrengths must be an array');
  return errors;
}

// Exported for tests + debugging
export const __internals = { BUDGET_RANGES, POINTS, LABELS, isAdjacentTech };
