<template lang='pug'>
svg.svg-icon(aria-hidden="true",:style='{width: size, height: size}')
  use(:xlink:href="`#icon-${type}`",:fill="color")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    // svg名字
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '1em',
    },
    color: {
      type: String,
      default: '#000',
    },
  },
  setup() {
    return {
    };
  },
});
</script>

<style lang="stylus" scoped>
// 只要把svg文件的fill都删掉就可以了
.svg-icon
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
</style>
