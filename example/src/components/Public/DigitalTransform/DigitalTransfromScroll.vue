<template lang="pug">
.dt-scroll
  .dt-scroll-list(ref='listRef', :style='listStyle')
    span.dt-scroll-digital(
      v-for="item in digitals" :key="item"
    ) {{ item }}
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref, watch,
} from 'vue';
import { digitalValidator } from './helper';

export default defineComponent({
  components: {},
  props: {
    to: {
      validator: digitalValidator,
      default: '0',
    },
    from: {
      validator: digitalValidator,
      default: '0',
    },
    dislocation: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 500,
    },
  },
  setup(props) {
    /** var */
    const listRef = ref(null);
    const digitals = ref([',', '.', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']);
    const listHeight = ref(0);
    const spacing = ref(1);
    const listStyle = computed(() => ({
      transitionDuration: `${(props.interval / 1000) * spacing.value}s`,
    }));
    const elHeight = computed(() => listHeight.value / digitals.value.length);
    /** method */
    const calcHeight = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      listHeight.value = (listRef.value as any).clientHeight;
    };
    const setPosition = (target: string) => {
      const idx = digitals.value.findIndex((d) => target === d);
      const offset = idx * elHeight.value;

      if (!listRef.value) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (listRef.value as any).style.transform = `translateY(-${offset}px)`;
    };
    /** watch */
    watch(
      () => props.to,
      (newVal, oldVal) => {
        if (listRef.value) return;

        if (props.dislocation) {
          const oldIndex = digitals.value.findIndex((d) => oldVal === d);
          const newIndex = digitals.value.findIndex((d) => newVal === d);
          spacing.value = Math.abs(newIndex - oldIndex);
        } else {
          spacing.value = 1;
        }
        setPosition(newVal);
      },
      { immediate: true, deep: true },
    );
    /** mounted */
    onMounted(() => {
      calcHeight();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (listRef.value as any).style.height = `${elHeight.value}px`;

      setPosition(props.from);

      setTimeout(() => {
        setPosition(props.to);
      }, 300);
    });
    return {
      listRef,
      listStyle,
      digitals,
    };
  },
});
</script>

<style lang="stylus" scoped>
.dt-scroll
  overflow hidden
  display inline-block
  height 1.5em
  .dt-scroll-list
    display inline-flex
    flex-direction column
    transition-property transform
    transition-timing-function cubic-bezier(0.42, 0, 0.62, 1.2)
</style>
