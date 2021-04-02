<template lang="pug">
div
  a-breadcrumb(seprator="/")
    breadcrumb-item(v-for="(route,index) in breadList",:key="route.breadcrumbName")
      router-link(:to="route.path",@click.native="handleClick(route,index)") {{route.breadcrumbName}}
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useStore, mapActions } from 'vuex';
import { Breadcrumb } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import getDefaultRoutes from '@/router/defaultRoutes';
import { Breadcrumb } from 'ant-design-vue';
import { Bread } from '@/types/base';
import { UserRole } from '@/types/user';

export default defineComponent({
  components: {
    aBreadcrumb: Breadcrumb,
    aBreadcrumbItem: Breadcrumb.Item,
  },
  computed: {
    ...mapState('breadcrumb', ['breadList']),
  },
  /**
   * 引用此组件后，在此组件的mounted事件回调函数中调用 breadcrumb/push 并将当前页面的面包屑传入即可，
   * 此组件会判断当前页面的路由并删除不需要的数据
   */
  setup(_, { emit }) {
    // 初始化面包屑数据
    const route = useRoute();
    const store = useStore();
    const breadList = computed(() => store.state.breadcrumb.breadList);
    const role = sessionStorage.getItem('role') as UserRole | null;
    function handleClick(r: Bread, bIndex: number) {
      if (bIndex < breadList.value.length - 1) {
        // splice(bIndex + 1);
        store.dispatch('breadcrumb/splice', bIndex + 1);
      }
    }

    const selfMounted = () => {
      // init();
      store.dispatch('breadcrumb/init');
      const list = getDefaultRoutes(role);
      if (list.find((r) => r.path === route.path)) {
      // clear();
        store.dispatch('breadcrumb/clear');
      }

      // 未点击面包屑时，自动删除不需要的 面包屑
      const { path } = route;
      const index = breadList.value.findIndex((p) => p.path.includes(path));
      if (index > -1) {
      // splice(index + 1);
        store.dispatch('breadcrumb/splice', index + 1);
      }
    };
    onMounted(() => {
      selfMounted();
    });

    return {
      handleClick,
      breadList,
    };
  },
});
</script>

<style lang="stylus" scoped>
.bcr-wrap
  font-size 14px
</style>
