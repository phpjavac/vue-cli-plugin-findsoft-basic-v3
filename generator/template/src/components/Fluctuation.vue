<template lang="pug">
.fluctuating-container
  slot(name='prefix')
  .data-container
    a-digital-transform(
      :value='value'
      :useGrouping='seperator'
      :interval='interval'
    )
    span.unit-box {{ unit }}
    transition(name='lotus')
      p.fluctuating-animate(v-show="isShow") {{ changeValue }}
</template>

<script lang="ts">
import {
  defineComponent, onUnmounted, ref, watch,
} from 'vue';
import DigitalTransform from '@/components/Public/DigitalTransform/DigitalTransform.vue';

export default defineComponent({
  components: {
    aDigitalTransform: DigitalTransform,
  },
  props: {
    value: {
      type: Number,
      default: 0,
      required: true,
    },
    unit: {
      type: String,
      default: '',
    },
    seperator: {
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
    const isShow = ref(false);
    const changeValue = ref(0);
    let animatingTimer: undefined|number; /** 防抖 */
    /** method */
    /** 防抖 */
    const digitalDebounce = () => {
      if (animatingTimer) {
        clearTimeout(animatingTimer);
      }
      isShow.value = true;
      animatingTimer = setTimeout(() => {
        isShow.value = false;
        animatingTimer = undefined;
      }, 1500);
    };
    /** 判断符号 */
    const isPlus = (testVal: number, isSep: boolean) => {
      // 判断是否为带有千分位符选项
      if (isSep) {
        const changeStr = testVal
          .toString()
          .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
        const result = changeStr.split('').join('');
        const first = changeStr.split('')[0];
        if (first.match(/^[0-9]$/)) {
          return `+${result}`;
        }
        return result;
      }
      if (testVal > 0) {
        return `+${testVal}`;
      }
      return testVal;
    };
    /** destroy */
    onUnmounted(() => {
      clearTimeout(animatingTimer);
    });
    /** watch */
    watch(
      () => props.value,
      (newVal, oldVal) => {
        changeValue.value = (isPlus(newVal - oldVal, props.seperator) as number);
        digitalDebounce();
      },
      { deep: true },
    );

    return {
      isShow,
      changeValue,
    };
  },
});
</script>

<style lang="stylus" scoped>
.lotus-enter
  transform translateY(20px)
  opacity 0
.lotus-enter-active
  transition all 0.5s cubic-bezier(1, 0.5, 0.8, 1)
.lotus-leave-active
  opacity 0
  transition all 1s
.fluctuating-container
  display flex
  align-items center
  i
    margin-left 8px
    margin-right 18px
    font-size 22px
    color #6A83DAFF
  .data-container
    position relative
    display flex
    font-size 16px
    // font-family SFProRounded-Bold, SFProRounded
    font-weight bold
    color rgba(0, 0, 0, 0.85)
    line-height 19px
    .unit-box
      margin-left 6px
      line-height 19px
    .fluctuating-animate
      position absolute
      justify-content space-around
      top -36px
      text-align center
      // font-family 'Arial-BoldItalicMT', 'Arial Bold Italic', 'Arial'
      font-weight 700
      font-style italic
      font-size 18px
      color limegreen
</style>
