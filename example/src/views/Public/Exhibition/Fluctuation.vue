<template lang="pug">
.main
  PageHeader(title='数值波动')
  .content.flex.flex-row.flex-wrap()
    .demo.pointer(v-for='(i, k) in demoList' @click='handleClick(k)')
      .d-title
        a-tag(:color='i.color') 点一点
        a-tag(:color='i.color') {{i.title}}
      a-fluctuation.d-view(v-bind='i')
        template(#prefix v-if='i.icon')
          a-icon(:type='i.icon')
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import Fluctuation from '@/components/Fluctuation.vue';
import { Tag } from 'ant-design-vue';

const list = [
  {
    value: 0,
    title: '基础款',
    color: 'pink',
  },
  {
    value: 999,
    title: '后缀单位',
    unit: '平方米',
    color: 'red',
  },
  {
    value: 10000,
    title: '前缀icon',
    icon: 'iconzhongzhi',
    color: 'cyan',
  },
  {
    value: 10000000,
    title: '千分位',
    seperator: true,
    color: 'blue',
  },
];
export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    aFluctuation: Fluctuation,
    aIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
    aTag: Tag,
  },
  props: {},
  setup() {
    const demoList = ref(list);
    const handleClick = (i: number) => {
      // demoList.value = demoList.value.map((v) => ({ ...v, value: Math.floor(Math.random() * 1000) }));
      const newVal = { ...list[i], value: Math.floor(Math.random() * 1000000) };
      // const newList = [...demoList.value];
      demoList.value.splice(i, 1, newVal);
      // demoList.value = newList;
    };
    return {
      demoList,
      handleClick,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .content
    padding 50px
    .demo
      width 300px
      margin 30px
      padding 30px
      background #ffffff
      border-radius $border-radius-base
      box-shadow 0px 0px 5px #ccc
      &:hover
        box-shadow 0px 0px 5px $primary-color
      .d-view
        background rgb(238,242,245)
        margin-top 40px
        border-radius $border-radius-base
        padding 10px
</style>
