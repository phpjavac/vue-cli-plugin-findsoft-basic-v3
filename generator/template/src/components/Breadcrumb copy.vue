<template lang="pug">
div
  //- breadcrumb(seprator="/")
    breadcrumb-item(v-for="(route,index) in breadList",:key="route.breadcrumbName")
      router-link(:to="route.path",@click.native="handleClick(route,index)") {{route.breadcrumbName}}
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, toRaw,
} from 'vue';
import { useStore, mapActions } from 'vuex';
import { Breadcrumb } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import getDefaultRoutes from '@/router/defaultRoutes';
import { Bread } from '@/types/base';
import { UserRole } from '@/types/user';

export default defineComponent({
  components: {
    breadcrumb: Breadcrumb,
    'breadcrumb-item': Breadcrumb.Item,
  },

  setup() {
    const route = useRoute();
    const store = useStore();
    const { init, splice, clear } = mapActions('breadcrumb', ['init', 'splice', 'clear']);
    const breadList = computed(() => store.state.breadcrumb.breadList);
    const role = sessionStorage.getItem('role') as UserRole | null;

    function handleClick(r: Bread, bIndex: number) {
      if (bIndex < breadList.value.length - 1) {
        // splice(bIndex + 1);
        store.dispatch('breadcrumb/splice', bIndex + 1);
      }
    }

    const selfMounted = async () => {
      // await init();
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
      console.log(getDefaultRoutes(role), 'list', role, 'role');
      selfMounted();
      console.log(toRaw(breadList.value));
    });

    return {
      breadList,
      handleClick,
    };
  },
});
</script>

<style lang="stylus" scoped>
.bcr-wrap
  font-size 14px
</style>
