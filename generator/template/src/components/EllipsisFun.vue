<template lang="pug">
.main
  template(v-if='showAll')
    a-tooltip(:title="text")
      span.ellipsis(
        ref='ellipsis'
        ) {{showText}}
  template(v-else)
    span.ellipsis(
      ref='ellipsis'
      ) {{showText}}
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
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
    ellipsisType: {
      type: String,
      default: '...',
    },
    /** 悬停是否显示全文内容 */
    showAll: {
      type: Boolean,
      default: true,
    },

    /** 字体大小 这个api也不重要 */
    fontSize: {
      type: Number,
      default: 14,
    },

    /** 限制的高度 */
    limitHeightNumber: {
      type: Number,
      default: 0,
    },
    /** 行高 直接获得实际高度，不从api获得 */
    // lineHeight: {
    //   type: Number,
    //   default: 18,
    // },
    /** 是否通过 高度限制 */
    isHeightLimit: {
      type: Boolean,
      default: false,
    },

    /** 限制的行数 —— 行数*行高 与 容器对比 */
    limitLineNumber: {
      type: Number,
      default: 1,
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

    /** getFontWidth 只处理了汉字。字母和数字也要优化 */
    const getFontWidth = () => {
      let FW = 0;
      /** 如果没传，dom获取 */
      const e = document.createElement('span');
      const t = document.createTextNode('啊');
      e.appendChild(t);
      document.body.appendChild(e);
      const domRect = (e as any).getBoundingClientRect();
      const { left: FL, right: FR } = domRect;
      if (FL && FR) FW = FR - FL;
      document.body.removeChild(e);

      return FW;
    };

    /** getLineHeight 高度是一致的。不需要考虑字母汉字 */
    const getLineHeight = () => {
      let FH = 0;
      /** 如果没传，dom获取 */
      const e = document.createElement('span');
      const t = document.createTextNode('啊');
      e.appendChild(t);
      document.body.appendChild(e);
      const domRect = (e as any).getBoundingClientRect();
      // console.log(domRect, 'domRect');
      const { height: DRH } = domRect;
      if (DRH) FH = DRH;
      document.body.removeChild(e);

      return FH;
    };

    /** lengthLimit */
    const lengthLimit = () => {
      const { text, maxLength, ellipsisType } = props;
      if (text.length > maxLength) return text.substr(0, maxLength) + ellipsisType;
      return text;
    };

    /** lineLimit */
    const lineLimit = () => {
      const {
        text, limitLineNumber, ellipsisType, fontSize,
      } = props;
      /** 获得单个字体大小 */
      const FW = fontSize || getFontWidth(); // 字体宽度&字体大小

      /** 获得父容器宽度 */
      const containerWidth = (ellipsis.value as any).parentNode.offsetWidth;

      /** 获得每行文字个数 —— 需要优化 字母和数字情况 */
      const strNum = Math.floor(containerWidth / FW);

      /** 判断长度 */
      if (strNum * limitLineNumber < text.length) {
        return text.substr(0, strNum * limitLineNumber - 1) + ellipsisType;
      }
      return text;
    };

    /** heightLimit */
    const heightLimit = () => {
      const {
        text, limitHeightNumber, ellipsisType, fontSize,
      } = props;

      /** 行高度 */
      const FH = getLineHeight();

      /** 获得单个字体大小 */
      const FW = fontSize || getFontWidth(); // 字体宽度&字体大小

      /** 获得父容器宽度 */
      const containerWidth = (ellipsis.value as any).parentNode.offsetWidth;

      /** 获得每行文字个数 —— 需要优化 字母和数字情况 */
      const strNum = Math.floor(containerWidth / FW);

      /** 计算最大行数 如果一行都不够，返回1行 */
      const maxLen = Math.floor(limitHeightNumber / FH) || 1;
      // console.log(maxLen, 'maxLen', ellipsisType);

      /** 判断长度 */
      if (strNum * maxLen < text.length) {
        return text.substr(0, strNum * maxLen - 1) + ellipsisType;
      }
      return text;
    };

    const getShowText = () => {
      const { isCharLimit, isLineLimit, isHeightLimit } = props;
      let res = '';
      if (isCharLimit) {
        res = lengthLimit();
      } else if (isLineLimit) {
        res = lineLimit();
      } else if (isHeightLimit) {
        res = heightLimit();
      }
      showText.value = res;
    };

    onMounted(() => {
      // console.log(ellipsis.value);
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
