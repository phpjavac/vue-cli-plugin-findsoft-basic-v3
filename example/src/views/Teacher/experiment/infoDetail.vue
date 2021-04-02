<template lang="pug">
.main
  breadcrumb(:breadcrumb="{breadcrumbName: '三级页面', path: $route.path}")
  .div 这是三级页面，主要用来展示面包屑
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  components: {
    breadcrumb: defineAsyncComponent(() => import('@/components/Breadcrumbs.vue')),
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
  .div
    margin 50px auto
</style>
