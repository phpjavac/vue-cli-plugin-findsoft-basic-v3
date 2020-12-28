<template lang="pug">
.main
  .test.flex.flex-row
    .test1.font-size-16.pointer 1
    .test1.test-color-primary 2
    .test1.test-vars 3
    .test1.test-self-style 4
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import StylusJson from '@/styles/variable.json';

export default defineComponent({
  components: {
    theHeader: defineAsyncComponent(() => import('@/components/Teacher/header.vue')),
  },
  setup() {
    console.log(StylusJson, 'sssssssss');
    return {};
  },
});
</script>
<style lang="stylus" scoped>
// @import '@/styles/variable.styl'
// 引入抱错，暂时先不考虑。如果想用的话，直接在stylus文件里定义类，然后直接在html里使用。再不济就单独写stylus控制

.main
  height 120vh
  .test
    .test-self-style
      background $testother
</style>
