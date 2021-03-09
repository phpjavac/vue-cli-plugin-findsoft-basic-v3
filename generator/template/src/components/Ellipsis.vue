<template lang="pug">
a-tooltip(:title="text")
  span.ellipsis(
    v-if='type === "length"'
    ) {{showText}}

  span.ellipsis.text-flow-ellipsis-multiple(
    v-else-if='type === "rows"'
    :style='typeRows()') {{showText}}

  .ellipsis.box(
    v-else-if='type === "height"'
    ref='ellipsis'
    :style='typeHeight()') {{showText}}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Tooltip } from 'ant-design-vue';

export default defineComponent({
  components: {
    aTooltip: Tooltip,
  },
  props: {
    /** 要省略的文本 */
    text: {
      type: String,
      default: '',
    },
    /** 省略类型 length、rows、height */
    type: {
      type: String,
      default: 'length',
    },
    /** 值 */
    number: {
      type: Number,
      default: 1,
    },

    /**  */
  },
  setup(props) {
    const ellipsis = ref(null);
    const showText = ref(''); /** 组件上显示的文本 */

    const typeLength = () => {
      if (props.number < props.text.length) return `${props.text.substr(0, props.number)}...`;
      return props.text;
    };
    const typeRows = () => ({
      '-webkit-line-clamp': props.number,
    });
    const typeHeight = () => ({
      height: `${props.number}px`,
    });

    onMounted(() => {
      let res = '';
      if (props.type === 'length') res = typeLength();
      if (['rows', 'height'].includes(props.type)) res = props.text;
      showText.value = res;

      console.log(ellipsis.value);
    });

    return {
      ellipsis,
      showText,
      typeRows,
      typeHeight,
    };
  },
});
</script>

<style lang="stylus" scoped>
/** 多行省略 */
.text-flow-ellipsis-multiple
  word-break break-all
  text-overflow ellipsis
  display -webkit-box
  -webkit-box-orient: vertical
  // -webkit-line-clamp: 2
  overflow hidden
/** 高度省略 */
.box
  position relative
  overflow hidden
  &:after
    content "..."
    position absolute
    bottom 0px
    right 0px
    padding-left 10px
    background transparent
    // background -webkit-linear-gradient(left, transparent, #fff 55%)
    // background -o-linear-gradient(right, transparent, #fff 55%)
    // background -moz-linear-gradient(right, transparent, #fff 55%)
    // background linear-gradient(to right, transparent, #fff 55%)
</style>
