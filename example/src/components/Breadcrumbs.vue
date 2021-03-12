<template lang="pug">
div
  a-breadcrumb(seprator="/")
    a-breadcrumb-item(v-for="(route,index) in breadList",:key="route.breadcrumbName")
      router-link(:to="route.path",@click.native="handleClick(route,index)") {{route.breadcrumbName}}
</template>

<script lang="ts">
/**
 * 方案
 * 1、通过路由文件的子父级关系确定面包屑的显示。即通过路由地址在路由文件中获得到子父关系
 * 2、面包屑的层级关系，直接手动操作。——面包屑显示的时候，只需要根据list直接显示就可以，不需要考虑路由的层级关系
 *    # 每次加载从storage里取，然后再渲染——init——为了处理刷新情况
 *    # 在组件调用时，向list中添加
 *    # 点击时，删除后面的
 */
import {
  computed, defineComponent, onMounted,
} from 'vue';
import { useStore } from 'vuex';
import { Breadcrumb } from 'ant-design-vue';
import { useRoute } from 'vue-router';
// import getDefaultRoutes from '@/router/defaultRoutes';
import { Bread } from '@/types/base';
// import { UserRole } from '@/types/user';

export default defineComponent({
  components: {
    aBreadcrumb: Breadcrumb,
    aBreadcrumbItem: Breadcrumb.Item,
  },

  setup() {
    const route = useRoute();
    const store = useStore();
    // const breadList = ref([
    //   {
    //     breadcrumbName: '111',
    //     path: 'breadcrumbName1',
    //   },
    //   {
    //     breadcrumbName: '222',
    //     path: 'breadcrumbName2',
    //   },
    //   {
    //     breadcrumbName: '333',
    //     path: 'breadcrumbName3',
    //   },
    // ]);
    const breadList = computed(() => store.state.breadcrumb.breadList);
    // const role = sessionStorage.getItem('role') as UserRole | null;

    function handleClick(r: Bread, bIndex: number) {
      if (bIndex < breadList.value.length - 1) {
        // splice(bIndex + 1);
        store.dispatch('breadcrumb/splice', bIndex);
      }
    }

    const selfMounted = async () => {
      // await init();
      store.dispatch('breadcrumb/init');
      // console.log('init', toRaw(breadList.value));
      // const list = getDefaultRoutes(role);
      // if (list.find((r) => r.path === route.path)) {
      //   // clear();
      //   store.dispatch('breadcrumb/clear');
      // }
      // console.log('clear', toRaw(breadList.value));

      // 未点击面包屑时，自动删除不需要的 面包屑
      const { path } = route;
      const index = breadList.value.findIndex((p) => p.path.includes(path));
      if (index > -1) {
        // splice(index + 1);
        store.dispatch('breadcrumb/splice', index);
      }
      // console.log('splice', toRaw(breadList.value));
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
