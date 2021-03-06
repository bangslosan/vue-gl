import VglGeometry from '../core/vgl-geometry.js';
import { LatheBufferGeometry } from '../three.js';
import { parseVector2Array } from '../parsers.js';
import { vector2Array, number } from '../validators.js';

/**
 * A component for creating extruded geometry from a path shape,
 * corresponding [THREE.ExtrudeGeometry](https://threejs.org/docs/index.html#api/geometries/ExtrudeGeometry).
 *
 * Properties of [VglGeometry](vgl-geometry) are also available as mixin.
 */

export default {
  mixins: [VglGeometry],
  props: {
    /** Array of Vector2s. The x-coordinate of each point must be greater than zero. */
    points: { type: vector2Array, required: true },
    /** The number of circumference segments to generate. */
    segments: { type: number, default: 12 },
    /** The starting angle in radians. */
    phiStart: { type: number, default: 0 },
    /** The radian (0 to 2PI) range of the lathed section. */
    phiLength: { type: number, default: Math.PI * 2 },
  },
  computed: {
    inst() {
      return new LatheBufferGeometry(
        parseVector2Array(this.points),
        parseInt(this.segments, 10),
        parseFloat(this.phiStart),
        parseFloat(this.phiLength),
      );
    },
  },
};
