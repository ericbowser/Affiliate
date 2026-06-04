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
import { rockhoundingSites } from '../../data/sites.js';

export { topaz, amethyst, opal, redBeryl, garnet, pseudobrookite, geode };

/** Map-pin icons (public/gem-markers) — same artwork as Google Maps markers */
const MAP_MARKER_ASSETS = {
  trilobite: '/gem-markers/trilobite.svg',
  agate:     '/gem-markers/agate.svg',
  fluorite:  '/gem-markers/fluorite.svg',
  sunstone:  '/gem-markers/sunstone.svg',
  pyrope:    '/gem-markers/pyrope.svg',
};

/** Keyed lookup — keys match GemIcon `name` prop */
export const GEM_ASSETS = {
  topaz,
  amethyst,
  opal,
  'red-beryl': redBeryl,
  garnet,
  pseudobrookite,
  geode,
  ...MAP_MARKER_ASSETS,
};

/**
 * Maps mineral display names (from sites.js "find" arrays)
 * to asset keys for automatic icon resolution.
 */
export const MINERAL_TO_ASSET = {
  'Topaz':                          'topaz',
  'Amethyst':                       'amethyst',
  'Opal':                           'opal',
  'Red Beryl (rare)':               'red-beryl',
  'Garnet':                         'garnet',
  'Pseudobrookite':                 'pseudobrookite',
  'Quartz geodes':                  'geode',
  'Amethyst geodes':                'geode',
  'Rose quartz geodes':             'geode',
  'Elrathia kingii trilobites':     'trilobite',
  'Asaphiscus wheeleri':            'trilobite',
  'Other marine fossils':           'trilobite',
  'Fluorite':                       'fluorite',
  'Agate':                          'agate',
  'Jasper':                         'agate',
  'Chalcedony':                     'agate',
  'Sunstones (oligoclase feldspar)': 'sunstone',
  'Pyrope garnets (Arizona Rubies)': 'pyrope',
};

/** Primary gem icon per site — matches map markerKey */
export const SITE_PRIMARY_GEM = Object.fromEntries(
  rockhoundingSites.map((site) => [site.id, site.markerKey])
);
