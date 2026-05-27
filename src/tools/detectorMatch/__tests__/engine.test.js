/**
 * Engine tests — demonstrates the SOLID payoff.
 * Because engine.js is pure (no React, no DOM, no products import),
 * these tests run in milliseconds with zero setup.
 *
 * Run with: npx jest src/tools/detectorMatch
 */

import { scoreDetector, recommendDetectors, validateDetectorAttrs } from '../engine.js';

// Test fixtures — completely independent of products.js
const fixtureDetectors = {
  beginnerDesert: {
    id: 'fx-beginner-desert',
    priceNumeric: 349,
    bestForExperience: ['beginner', 'some'],
    specialties: ['coins-jewelry', 'relics', 'all-around'],
    waterproofDepth: 0,
    weightLbs: 2.8,
    techLevel: 'digital',
    terrainStrengths: ['mineralized-desert', 'fields', 'mixed'],
    multiFrequency: false,
    pitchAngle: 'test',
  },
  waterproofIntermediate: {
    id: 'fx-waterproof-int',
    priceNumeric: 699,
    bestForExperience: ['some', 'experienced'],
    specialties: ['relics', 'all-around'],
    waterproofDepth: 10,
    weightLbs: 3.0,
    techLevel: 'advanced',
    terrainStrengths: ['mineralized-desert', 'creek', 'mixed'],
    multiFrequency: false,
    pitchAngle: 'test',
  },
  premiumGold: {
    id: 'fx-premium-gold',
    priceNumeric: 899,
    bestForExperience: ['experienced'],
    specialties: ['gold'],
    waterproofDepth: 0,
    weightLbs: 3.5,
    techLevel: 'advanced',
    terrainStrengths: ['mixed'],
    multiFrequency: true,
    pitchAngle: 'test',
  },
};

const fixtureAnswers = {
  beginnerOnDesert: {
    budget: '300-500',
    experience: 'beginner',
    primaryUse: 'all-around',
    terrain: 'mineralized-desert',
    waterUse: 'never',
    tech: 'digital',
  },
  creekHunter: {
    budget: '500-800',
    experience: 'some',
    primaryUse: 'relics',
    terrain: 'creek',
    waterUse: 'submerged',
    tech: 'advanced',
  },
  beginnerWantsSubmerged: {
    budget: '300-500',
    experience: 'beginner',
    primaryUse: 'all-around',
    terrain: 'fields',
    waterUse: 'submerged',  // beginnerDesert is NOT waterproof
    tech: 'digital',
  },
};

describe('scoreDetector', () => {
  test('strong match returns high score with all reasons populated', () => {
    const { score, matches } = scoreDetector(
      fixtureDetectors.beginnerDesert,
      fixtureAnswers.beginnerOnDesert
    );
    expect(score).toBeGreaterThan(70);
    expect(matches.length).toBeGreaterThan(2);
    expect(matches.some(m => m.includes('beginner'))).toBe(true);
    expect(matches.some(m => m.includes('mineralized desert'))).toBe(true);
  });

  test('disqualifies detector when water requirement cannot be met', () => {
    const { score } = scoreDetector(
      fixtureDetectors.beginnerDesert,         // waterproofDepth: 0
      fixtureAnswers.beginnerWantsSubmerged    // requires submerged
    );
    expect(score).toBe(-Infinity);
  });

  test('disqualifies detector that is 50%+ over budget', () => {
    const { score } = scoreDetector(
      fixtureDetectors.premiumGold,            // $899
      fixtureAnswers.beginnerOnDesert          // budget $300-500
    );
    expect(score).toBe(-Infinity);
  });
});

describe('recommendDetectors', () => {
  test('returns primary and runnerUp sorted by score', () => {
    const result = recommendDetectors(
      Object.values(fixtureDetectors),
      fixtureAnswers.beginnerOnDesert
    );
    expect(result.primary).not.toBeNull();
    expect(result.primary.detector.id).toBe('fx-beginner-desert');
    expect(result.primary.score).toBeGreaterThanOrEqual(
      result.runnerUp?.score ?? -Infinity
    );
  });

  test('disqualified detectors are filtered out of results', () => {
    const result = recommendDetectors(
      Object.values(fixtureDetectors),
      fixtureAnswers.beginnerWantsSubmerged
    );
    // Only waterproofIntermediate has depth >= 10
    expect(result.all.every(r => r.detector.waterproofDepth >= 10)).toBe(true);
  });

  test('handles empty detector list', () => {
    const result = recommendDetectors([], fixtureAnswers.beginnerOnDesert);
    expect(result.primary).toBeNull();
    expect(result.runnerUp).toBeNull();
    expect(result.all).toEqual([]);
  });
});

describe('validateDetectorAttrs', () => {
  test('returns no errors for a valid detector', () => {
    expect(validateDetectorAttrs(fixtureDetectors.beginnerDesert)).toEqual([]);
  });

  test('catches missing required fields', () => {
    const incomplete = { id: 'broken', priceNumeric: 100 };
    const errors = validateDetectorAttrs(incomplete);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.includes('specialties'))).toBe(true);
  });
});
