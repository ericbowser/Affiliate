/**
 * Detector Match — Quiz Questions
 *
 * Pure data. The UI iterates this array — no question logic is hardcoded in components.
 * To add/remove/reorder questions: edit this file. The engine and UI adapt automatically
 * (as long as the answer keys still match what engine.js expects).
 *
 * @module questions
 */

/**
 * @typedef {Object} QuizOption
 * @property {string} value      - Machine value passed to engine
 * @property {string} label      - Human-facing label
 * @property {string} [hint]     - Optional short hint shown below the label
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {string} id         - Matches a key on QuizAnswers
 * @property {string} label      - The question prompt
 * @property {QuizOption[]} options
 */

/** @type {QuizQuestion[]} */
export const questions = [
  {
    id: 'budget',
    label: "What's your budget?",
    options: [
      { value: 'under-300', label: 'Under $300', hint: 'Entry level' },
      { value: '300-500',   label: '$300 – $500', hint: 'Beginner to intermediate' },
      { value: '500-800',   label: '$500 – $800', hint: 'Serious hunters' },
      { value: '800-plus',  label: '$800+',       hint: 'Pro tier' },
    ],
  },
  {
    id: 'experience',
    label: "What's your experience level?",
    options: [
      { value: 'beginner',    label: 'Brand new',     hint: "Never used a detector" },
      { value: 'some',        label: 'Some experience', hint: "Used one before" },
      { value: 'experienced', label: 'Experienced',   hint: "Know what I want" },
    ],
  },
  {
    id: 'primaryUse',
    label: 'What are you mainly hunting?',
    options: [
      { value: 'coins-jewelry', label: 'Coins & jewelry',  hint: 'Parks, beaches, modern sites' },
      { value: 'relics',        label: 'Relics & history', hint: 'Old homesteads, battle sites' },
      { value: 'gold',          label: 'Gold prospecting', hint: 'Flakes and small nuggets' },
      { value: 'all-around',    label: 'A bit of everything' },
    ],
  },
  {
    id: 'terrain',
    label: 'Where will you mostly use it?',
    options: [
      { value: 'mineralized-desert', label: 'Western desert',    hint: 'Utah, Nevada, Arizona — mineralized soil' },
      { value: 'creek',              label: 'Creeks & streams' },
      { value: 'fields',             label: 'Fields & open ground' },
      { value: 'mixed',              label: 'Mixed — everywhere' },
    ],
  },
  {
    id: 'waterUse',
    label: 'Will you put it in water?',
    options: [
      { value: 'never',     label: "No — dry ground only" },
      { value: 'shallow',   label: 'Shallow — wading in creeks' },
      { value: 'submerged', label: 'Yes — full submersion' },
    ],
  },
  {
    id: 'tech',
    label: 'How techy do you want it?',
    options: [
      { value: 'simple',   label: 'Keep it simple',  hint: 'Point and find' },
      { value: 'digital',  label: 'Digital is fine', hint: 'Target ID, basic menus' },
      { value: 'advanced', label: 'Love settings',   hint: 'Multi-frequency, smartphone app' },
    ],
  },
];

/** Total number of questions — used by progress UI */
export const TOTAL_QUESTIONS = questions.length;
