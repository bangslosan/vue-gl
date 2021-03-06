import VglMaterial from './vgl-material.js';
import { MeshNormalMaterial } from '../three.js';
import { boolean } from '../validators.js';

/**
 * A material that maps the normal vectors to RGB colors,
 * corresponding [THREE.MeshNormalMaterial](https://threejs.org/docs/index.html#api/materials/MeshNormalMaterial).
 *
 * Properties of [VglMaterial](vgl-material) are also available as mixin.
 */

export default {
  mixins: [VglMaterial],
  props: {
    /** Whether the material is affected by fog. */
    fog: boolean,
  },
  computed: {
    inst: () => new MeshNormalMaterial(),
  },
  watch: {
    inst: {
      handler(inst) { Object.assign(inst, { fog: this.fog }); },
      immediate: true,
    },
    fog(fog) { this.inst.fog = fog; },
  },
};
