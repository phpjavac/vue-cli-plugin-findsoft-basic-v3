<template lang="pug">
.card
  .c-head.text-ellipsis
    span.en {{nameEn}}
    span.ch {{name}}
  .c-body.flex.flex-row.justify-between.align-items-center
    img(:src='image')
  .c-foot
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { ComponentFace } from '@/views/Public/Exhibition/index';

export default defineComponent({
  components: {},
  props: {
    name: {
      type: String,
      default: '',
    },
    nameEn: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
    };
  },
});
</script>

<style lang="stylus" scoped>
.card
  .c-head
    height 40px
    line-height 40px
    border-bottom 1px solid #cccccc
    .en
      padding-left 12px
      font-weight 500
    .ch
      padding-left 8px
  .c-body
    width 100%
    height 220px
    img
      margin 0 auto
      width auto
      height auto
      max-width 200px
      max-height 200px
</style>
