<template lang="pug">
//- 页面参考antd组件展示页面
.exhibition
  template(v-if='current === "list"')
    PageHeader(title='组件列表' :back='false')
    .component-main
      a-row(:gutter="[32,32]")
        a-col(v-bind='grid', v-for='item in componentList' :key='item.path' @click='changeComponent(item.nameEn)')
          .item.component.pointer
            Card(v-bind='item')
  template(v-else)
    component(
      :is='current'
    )
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import {Row,Col} from 'ant-design-vue'
// import { useRoute } from 'vue-router';
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
    CaseCardView: defineAsyncComponent(() => import('@/views/Public/Exhibition/CaseCardView.vue')),
    DistributeModalView: defineAsyncComponent(() =>
      import('@/views/Public/Exhibition/DistributeModalView.vue'),
    ),
    DraggableTable:defineAsyncComponent(()=>import('@/views/Public/Exhibition/DraggableTable.vue')),
    BasicIcon: defineAsyncComponent(()=>import('@/views/Public/Exhibition/BasicIcon.vue')),
    aRow: Row,
    aCol: Col,
  },
  props: {},
  setup() {
    // const route = useRoute();
    const store = useStore();
    const current = computed(() => store.state.exhibition.current);

    /** 切换组件 */
    const changeComponent = (nameEn: string) => {
      store.commit('exhibition/upCurrent', nameEn || 'list');
    };

    onMounted(() => {
      changeComponent('');
      console.log(current, 'current');
      // store.dispatch('breadcrumb/push', {
      //   breadcrumbName: '自定义啦',
      //   path: route.path,
      // });
    });

    return {
      current,
      changeComponent,

      componentList,
      grid:{
        xs: 12,
        lg: 8,
        xl: 6,
        xxl: 4
      }
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
