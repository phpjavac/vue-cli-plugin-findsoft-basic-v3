<template lang="pug">
a-tooltip(:title="text")
  span.ellipsis(
    ) {{showText}}
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Tooltip } from 'ant-design-vue';

export default defineComponent({
  components: {
    aTooltip: Tooltip,
  },
  props: {
    /** 长文本 */
    text: {
      type: String,
      default: '',
    },
    /** 超出时显示的内容 */
    type: {
      type: String,
      defalut: '...',
    },

    /** 限制的行数 —— 行数*行高 与 容器对比 */
    limitLineNumber: {
      type: Number,
      default: 1,
    },
    /** 行高 */
    lineHeight: {
      type: Number,
      default: 18,
    },
    /** 是否通过 行数控制 */
    isLineLimit: {
      type: Boolean,
      default: false,
    },

    /** 是否根据长度限制 */
    isCharLimit: {
      type: Boolean,
      default: false,
    },
    /** 长度 */
    maxLength: {
      type: Number,
      default: 20,
    },

  },
  setup(props) {
    const ellipsis = ref(null);
    const showText = ref(''); /** 组件上显示的文本 */

    /** lengthLimit */
    const lengthLimit = () => {
      const { text, maxLength, type } = props;
      if (text.length > maxLength) return text.substr(0, maxLength) + type;
      return text;
    };

    /** lineLimit */
    const lineLimit = () => {
      const { text, lineHeight, limitLineNumber } = props;
      const res = '';

      return res;
    };

    const getShowText = () => {
      const { isCharLimit, isLineLimit } = props;
      let res = '';
      if (isCharLimit) res = lengthLimit();
      if (isLineLimit) res = lineLimit();
      showText.value = res;
    };

    onMounted(() => {
      console.log(ellipsis.value);
      getShowText();
    });

    return {
      ellipsis,
      showText,
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
