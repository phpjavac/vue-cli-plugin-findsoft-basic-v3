<template lang="pug">
.main
  breadcrumb(:breadcrumb="breadcrumb")
  .div 这是列表页，主要用来显示面包屑
  .div.pointer(@click='goInfo') 点击进入详情页
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    breadcrumb: defineAsyncComponent(() => import('@/components/Breadcrumbs.vue')),
  },
  props: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const goInfo = () => {
      router.push('/Teacher/experimentinfo');
    };

    return {
      breadcrumb: { breadcrumbName: '一级页面', path: route.path },
      goInfo,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .div
    margin 50px auto
</style>
