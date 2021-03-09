<template lang="pug">
.main
  PageHeader(title='文本省略')
  .content.flex.flex-row.flex-wrap
    .demo(v-for='(i, k) in ellipasisLists' :key='k')
      .title
        a-tag(:color='i.color' v-for='t in i.title') {{t}}
      .demo-d
        EllipaisFun(v-bind='i')
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import { Tag } from 'ant-design-vue';

const text = '史蒂夫—乔布斯，是一名美国企业家、营销家和发明家，苹果公司的联合创始人之一，曾任董事长及首席执行官职位，NeXT创办人及首席执行官，也是皮克斯动画的创办人并曾任首席执行官，2006年为华特迪士尼公司的董事会成员。2017年9月苹果发布会举行的地方，以他命名为 Steve Jobs Theater 。';
const ellipasisLists = [
  {
    type: 'length',
    text,
    isCharLimit: true,
    maxLength: 50,
    title: ['长度限制', '长度50'],
    color: 'pink',
  },
  {
    type: 'rows',
    text,
    isLineLimit: true,
    limitLineNumber: 3,
    title: ['行数限制', '行数3'],
    color: 'red',
  },
  {
    type: 'height',
    text,
    isHeightLimit: true,
    limitHeightNumber: 46,
    title: ['高度限制', '高度40'],
    color: 'cyan',
  },
  {
    type: 'length',
    text,
    isCharLimit: true,
    maxLength: 50,
    showAll: false,
    title: ['长度限制', '无悬停全文'],
    color: 'pink',
  },
];
export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    Ellipais: defineAsyncComponent(() => import('@/components/Ellipsis.vue')),
    EllipaisFun: defineAsyncComponent(() => import('@/components/EllipsisFun.vue')),
    aTag: Tag,
  },
  props: {},
  setup() {
    return {
      ellipasisLists,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .content
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
