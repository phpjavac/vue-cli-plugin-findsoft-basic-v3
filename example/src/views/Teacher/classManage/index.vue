<template lang="pug">
.main
  .test.flex.flex-row
    .test1.font-size-16.pointer 2
    .test1.test-color-primary 1
    .test1 3
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  components: {
    theHeader: defineAsyncComponent(() => import('@/components/Teacher/header.vue')),
  },
});
</script>
<style lang="stylus" scoped>
.main
  height 120vh
</style>
