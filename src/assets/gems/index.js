/**
 * Gem SVG asset index
 * Import individual URLs or the full map.
 *
 * Usage:
 *   import { topaz, garnet } from '../assets/gems';
 *   <img src={topaz} alt="Topaz" />
 *
 *   import { GEM_ASSETS } from '../assets/gems';
 *   <img src={GEM_ASSETS['topaz']} alt="Topaz" />
 */

import topaz from './topaz.svg';
import amethyst from './amethyst.svg';
import opal from './opal.svg';
import redBeryl from './red-beryl.svg';
import garnet from './garnet.svg';
import pseudobrookite from './pseudobrookite.svg';
import geode from './geode.svg';

export { topaz, amethyst, opal, redBeryl, garnet, pseudobrookite, geode };

/** Keyed lookup — keys match site mineral names and GemIcon `name` prop */
export const GEM_ASSETS = {
  topaz,
  amethyst,
  opal,
  'red-beryl': redBeryl,
  garnet,
  pseudobrookite,
  geode,
};

/**
 * Maps mineral display names (from sites.js "find" arrays)
 * to asset keys for automatic icon resolution.
 */
export const MINERAL_TO_ASSET = {
  'Topaz':              'topaz',
  'Amethyst':           'amethyst',
  'Opal':               'opal',
  'Red Beryl (rare)':   'red-beryl',
  'Garnet':             'garnet',
  'Pseudobrookite':     'pseudobrookite',
  'Quartz geodes':      'geode',
  'Amethyst geodes':    'geode',
  'Rose quartz geodes': 'geode',
  'Fluorite':           null,   // future: add fluorite.svg
  'Sunstone':           null,   // future: add sunstone.svg
};

/** Primary gem icon for each site (by site id) */
export const SITE_PRIMARY_GEM = {
  'topaz-mountain':     'topaz',
  'dugway-geode-beds':  'geode',
  'u-dig-fossils':      null,
  'tintic-mountains':   'garnet',
  'san-rafael-swell':   null,
  'marysvale':          'opal',
  'sunstone-knoll':     null,
  'comb-ridge':         'garnet',
};
