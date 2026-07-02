/**
 * Detector Match — Quiz Attributes
 *
 * Enriches the metal-detector entries in products.js with the attributes
 * needed for quiz scoring. Keyed by product id.
 *
 * Why a separate file:
 *   - products.js stays focused on display/affiliate data
 *   - This file is the single source of truth for quiz scoring inputs
 *   - Adding a new detector = add it to products.js AND add an entry here
 *
 * To extend the catalog:
 *   1. Add the detector to src/data/products.js with category "metal-detectors"
 *   2. Add a matching entry below, keyed by the same id
 *   3. Run the quiz — no engine or UI changes needed (Open/Closed)
 *
 * @module detectorAttrs
 */

import { products } from '../../data/products.js';
import { validateDetectorAttrs } from './engine.js';

/**
 * Quiz-specific attributes for each detector.
 * Keyed by product id. See engine.js for the DetectorAttrs typedef.
 */
const QUIZ_ATTRS = {
  'nokta-simplex-lite': {
    priceNumeric: 249,
    bestForExperience: ['beginner', 'some'],
    specialties: ['coins-jewelry', 'all-around'],
    waterproofDepth: 16,
    weightLbs: 2.6,
    techLevel: 'simple',
    terrainStrengths: ['fields', 'creek', 'mixed'],
    multiFrequency: false,
    pitchAngle:
      "Fully waterproof to 16 ft at under $300 is genuinely rare — most detectors at this price aren't even rainproof. Single-menu design means you're hunting in under five minutes, and the USB-rechargeable battery removes a real annoyance of entry-level competitors.",
  },

  'garrett-ace-400': {
    priceNumeric: 349,
    bestForExperience: ['beginner', 'some'],
    specialties: ['coins-jewelry', 'relics', 'all-around'],
    waterproofDepth: 0,
    weightLbs: 2.8,
    techLevel: 'digital',
    terrainStrengths: ['mineralized-desert', 'fields', 'mixed'],
    multiFrequency: false,
    pitchAngle:
      "Iron Audio plus a DD search coil makes the Ace 400 exceptional at separating junk from real finds in Utah's mineralized desert soil. The frequency-adjust feature handles trashy areas other beginner detectors choke on.",
  },

  'minelab-vanquish-540': {
    priceNumeric: 399,
    bestForExperience: ['beginner', 'some'],
    specialties: ['coins-jewelry', 'all-around'],
    waterproofDepth: 3,
    weightLbs: 2.6,
    techLevel: 'advanced',
    terrainStrengths: ['fields', 'mixed', 'creek'],
    multiFrequency: true,
    pitchAngle:
      "Multi-IQ simultaneous multi-frequency at a beginner price is genuinely rare — most detectors with this tech start over $700. Add 3 ft waterproofing for creek hunting and a smartphone app, and it's the most versatile entry-level pick on the market.",
  },

  'garrett-at-max': {
    priceNumeric: 699,
    bestForExperience: ['some', 'experienced'],
    specialties: ['relics', 'all-around', 'coins-jewelry'],
    waterproofDepth: 10,
    weightLbs: 3.03,
    techLevel: 'advanced',
    terrainStrengths: ['mineralized-desert', 'creek', 'fields', 'mixed'],
    multiFrequency: false,
    pitchAngle:
      "Fully submersible to 10 ft, Z-Lynk wireless audio with low latency, and ground balance dialed for tough mineralized soil. The AT Max is the field-proven workhorse for hunters who want one detector that handles everything — including the creek.",
  },

  'garrett-goldmaster-24k': {
    priceNumeric: 729,
    bestForExperience: ['some', 'experienced'],
    specialties: ['gold'],
    waterproofDepth: 0,
    weightLbs: 3.0,
    techLevel: 'advanced',
    terrainStrengths: ['mineralized-desert', 'creek', 'mixed'],
    multiFrequency: false,
    pitchAngle:
      "Purpose-built for gold at 48 kHz — a frequency that catches tiny flakes and small nuggets other detectors miss entirely. The XGB auto ground balance system is specifically designed to handle the highly mineralized soil where gold actually lives.",
  },

  'minelab-equinox-800': {
    priceNumeric: 899,
    bestForExperience: ['some', 'experienced'],
    specialties: ['coins-jewelry', 'relics', 'gold', 'all-around'],
    waterproofDepth: 10,
    weightLbs: 2.96,
    techLevel: 'advanced',
    terrainStrengths: ['mineralized-desert', 'fields', 'creek', 'mixed'],
    multiFrequency: true,
    pitchAngle:
      "Multi-IQ simultaneous multi-frequency means one detector for coins, relics, gold, and beach — no compromise. Fully submersible to 10 ft, 4 dedicated modes, and wireless apt-X audio. This is the single most versatile detector on the market under $1k.",
  },

  'minelab-equinox-900': {
    priceNumeric: 1099,
    bestForExperience: ['experienced'],
    specialties: ['coins-jewelry', 'relics', 'gold', 'all-around'],
    waterproofDepth: 10,
    weightLbs: 2.8,
    techLevel: 'advanced',
    terrainStrengths: ['mineralized-desert', 'fields', 'creek', 'mixed'],
    multiFrequency: true,
    pitchAngle:
      "Everything the Equinox 800 does, plus 119 high-resolution target IDs for sharper discrimination and a carbon-fiber 3-piece shaft that packs to 24 inches. Comes with both 11\" and 6\" coils in the box — true flagship territory.",
  },
};

/**
 * Build the quiz-ready detector list by joining products.js entries
 * with their quiz attributes. Throws if a detector is missing attrs
 * (we want a loud failure, not silent bugs).
 *
 * @returns {(import('./engine.js').DetectorAttrs & {name: string, url: string, price: string, rating: number, tagline: string})[]}
 */
export function getDetectorsForQuiz() {
  const detectors = products.filter(
    p => p.category === 'metal-detectors' && QUIZ_ATTRS[p.id]
  );

  return detectors.map(p => {
    const attrs = QUIZ_ATTRS[p.id];
    if (!attrs) {
      throw new Error(
        `Detector "${p.id}" is in products.js but missing from detectorAttrs.js. ` +
        `Add an entry to QUIZ_ATTRS to include it in the quiz.`
      );
    }
    const errors = validateDetectorAttrs({ id: p.id, ...attrs });
    if (errors.length) {
      throw new Error(`Invalid quiz attrs for "${p.id}": ${errors.join('; ')}`);
    }
    return {
      // Display fields (from products.js)
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      price: p.price,
      rating: p.rating,
      url: p.url,
      pros: p.pros,
      cons: p.cons,
      bestFor: p.bestFor,
      // Quiz scoring fields (from QUIZ_ATTRS)
      ...attrs,
    };
  });
}
