describe('VglLatheGeometry:', function suite() {
  const { VglLatheGeometry, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-lathe-geometry ref="g" points="0 0" /></vgl-namespace>',
      components: { VglLatheGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.LatheBufferGeometry([new THREE.Vector2(0, 0)]));
        expect(expected.toJSON()).to.deep.equal(mediator.copy(vm.$refs.g.inst).toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-lathe-geometry ref="g" points="1 -2, 2 1, 3 3.2" segments="60" phi-start="0.1" phi-length="3.3" /></vgl-namespace>',
      components: { VglLatheGeometry, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const mediator = new THREE.BufferGeometry();
        const expected = mediator.copy(new THREE.LatheBufferGeometry(
          [new THREE.Vector2(1, -2), new THREE.Vector2(2, 1), new THREE.Vector2(3, 3.2)],
          60,
          0.1,
          3.3,
        )).toJSON();
        expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-lathe-geometry ref="g" :points="points" :segments="segs" :phi-start="start" :phi-length="length" /></vgl-namespace>',
      components: { VglLatheGeometry, VglNamespace },
      data: {
        points: '0.1 -3, 2 5',
        segs: '18',
        start: '0.3',
        length: '1.1',
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.points = '0.5 -2, 2 4';
      vm.segs = '67';
      vm.start = '0.5';
      vm.length = '2.1';
      vm.$nextTick(() => {
        try {
          const mediator = new THREE.BufferGeometry();
          const expected = mediator.copy(new THREE.LatheBufferGeometry(
            [new THREE.Vector2(0.5, -2), new THREE.Vector2(2, 4)],
            67,
            0.5,
            2.1,
          )).toJSON();
          expect(mediator.copy(vm.$refs.g.inst).toJSON()).to.deep.equal(expected);
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
