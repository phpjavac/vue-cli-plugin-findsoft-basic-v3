<template lang="pug">
.main
  breadcrumb
  .div 这是详情页，主要用来展示面包屑
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import breadcrumb from '@/components/Breadcrumbs.vue';

export default defineComponent({
  components: {
    breadcrumb,
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
