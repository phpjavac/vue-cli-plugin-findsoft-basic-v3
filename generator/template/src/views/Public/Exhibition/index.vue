<template lang="pug">
//- 页面参考antd组件展示页面
.exhibition
  template(v-if='current === "list"')
    PageHeader(title='组件列表' :back='false')
    .component-main.flex.flex-row.flex-wrap
      .component.pointer(v-for='item in componentList' :key='item.path' @click='changeComponent(item.nameEn)')
        Card(v-bind='item')
  template(v-else)
    component(
      :is='current'
    )
</template>

<script lang="ts">
import {
  computed, defineAsyncComponent, defineComponent, onMounted,
} from 'vue';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
import { componentList } from './index';

export default defineComponent({
  components: {
    Card: defineAsyncComponent(() => import('@/components/Public/Exhibition/Card.vue')),
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    Upload: defineAsyncComponent(() => import('@/views/Public/Exhibition/Upload.vue')),
    CityBuild: defineAsyncComponent(() => import('@/views/Public/Exhibition/CityBuild.vue')),
    Ellipsis: defineAsyncComponent(() => import('@/views/Public/Exhibition/Ellipsis.vue')),
    ToTop: defineAsyncComponent(() => import('@/views/Public/Exhibition/ToTop.vue')),
    Fluctuation: defineAsyncComponent(() => import('@/views/Public/Exhibition/Fluctuation.vue')),
  },
  props: {},
  setup() {
    // const router = useRouter();
    const store = useStore();
    const current = computed(() => store.state.exhibition.current);

    /** 切换组件 */
    const changeComponent = (nameEn: string) => {
      store.commit('exhibition/upCurrent', nameEn || 'list');
    };

    onMounted(() => {
      changeComponent('');
      console.log(current, 'current');
    });

    return {
      current,
      changeComponent,

      componentList,
    };
  },
});
</script>

<style lang="stylus" scoped>
.exhibition
  .title
    margin-top 8px
    margin-bottom 20px
    color rgba(0,0,0,.85)
    font-weight 500
    font-size 30px
    line-height 38px
  .component-main
    .component
      width 260px
      height 260px
      // padding 5px
      box-shadow 0 0 5px #ccc
      margin-right 25px
      border-radius 8px
      background #ffffff
      &:hover
        box-shadow 0 0 5px $primary-color
</style>
