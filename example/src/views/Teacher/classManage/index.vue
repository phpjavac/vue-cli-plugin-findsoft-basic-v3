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
@import '~/../../../../styles/variable.styl'

.main
  height 120vh
  .test
    .test-self-style
      background $testother
</style>
