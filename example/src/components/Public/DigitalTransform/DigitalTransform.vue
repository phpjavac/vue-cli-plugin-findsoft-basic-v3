<template lang="pug">
transition-group.digital-transform(name='vdt-slide-y' tag='div')
  a-digital-transfrom-scroll.digital-transform-item(
    v-for='(item, i) in digitals'
    :key="i+ 'key'"
    :to="item"
    :interval="interval"
    :dislocation="dislocation"
    from="0"
  ) {{ item }}
</template>

<script lang="ts">
import {
  defineComponent, nextTick, Ref, ref, watch,
} from 'vue';
import { looseDigitalValidator } from './helper';
import DigitalTransfromScroll from './DigitalTransfromScroll.vue';

export default defineComponent({
  components: {
    aDigitalTransfromScroll: DigitalTransfromScroll,
  },
  props: {
    value: {
      validator: looseDigitalValidator,
      default: '', // undefined 不能断言为string
      required: true,
    },
    dislocation: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 500,
    },
    useGrouping: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    /** var */
    const digitals: Ref<string[]> = ref([]);
    const oldDigtals: Ref<string[]> = ref([]);
    /** method */
    const parseDigital = (digitalsValue: string) => {
      let digitalsStr = `${digitalsValue}`;

      if (props.useGrouping) {
        digitalsStr = digitalsStr.replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
      }

      const digitalArr = digitalsStr.split('');

      oldDigtals.value = digitals.value.concat();
      digitals.value.length = 0;
      nextTick(() => {
        digitals.value = digitalArr;
        // console.log(toRaw(digitals.value), 'digitals.value', digitalArr);
      });
    };
    /** watch */
    watch(
      () => props.value,
      (newVal) => {
        nextTick(() => {
          parseDigital(`${newVal}`);
        });
      },
      { immediate: true, deep: true },
    );
    return {
      digitals,
    };
  },
});
</script>

<style lang="stylus" scoped>
.digital-transform
  display inline-flex
  .digital-transform-item
    display inline-block
.vdt-slide-y-enter, .vdt-slide-y-leave-to
  opacity 0
  transform translateY(10px)
</style>
