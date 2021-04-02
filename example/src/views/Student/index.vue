<template lang="pug">
.main
  the-header
  router-view.container 学生端
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  components: {
    theHeader: defineAsyncComponent(() => import('@/components/Teacher/header.vue')),
  },
  props: {},
  setup() {
    return {
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  min-width 1366px
  min-height 100vh
  background #EEF2F5
  text-align center
  .container
    padding 0 90px 0 110px
    margin 0 auto
    margin-top 24px
    text-align left
    :deep().ant-table table
      background #ffffff
    :deep().ant-table-tbody > tr.ant-table-row-selected td
      background rgba(74,144,226,0.16);
</style>
