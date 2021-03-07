<template lang="pug">
.main
  PageHeader(title='文本省略')
  .content.flex.flex-row.justify-start
    //- template( v-for='(i,k) in ellipasisList')
      .div
        .title {{i.type}}
        .div(:class='`el-${i.type}`')
          Ellipais(v-bind='i')
          //- EllipaisFun()
    template( v-for='(i,k) in ellipasisLists')
      .div
        .title 另一种方式{{i.type}}
        .div.el-length
          EllipaisFun(v-bind='i')
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    Ellipais: defineAsyncComponent(() => import('@/components/Ellipsis.vue')),
    EllipaisFun: defineAsyncComponent(() => import('@/components/EllipsisFun.vue')),
  },
  props: {},
  setup() {
    const text = '史蒂夫·乔布斯，是一名美国企业家、营销家和发明家，苹果公司的联合创始人之一，曾任董事长及首席执行官职位，NeXT创办人及首席执行官，也是皮克斯动画的创办人并曾任首席执行官，2006年为华特迪士尼公司的董事会成员。2017年9月苹果发布会举行的地方，以他命名为 Steve Jobs Theater 。';
    const ellipasisList = [
      {
        type: 'length',
        text,
        number: 50,
      },
      {
        type: 'rows',
        text,
        number: 3,
      },
      {
        type: 'height',
        text,
        number: 60,
      },
    ];
    const ellipasisLists = [
      {
        type: 'length',
        text,
        isCharLimit: true,
        maxLength: 50,
      },
      {
        type: 'rows',
        text,
        isLineLimit: true,
        limitLineNumber: 3,
      },
      {
        type: 'height',
        text,
        isHeightLimit: true,
        limitHeightNumber: 60,
      },
    ];
    return {
      ellipasisList,
      ellipasisLists,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .content
    .div
      background #ffffff
      margin 10px
    .el-length
      width 300px
      height 60px
      margin 10px auto
    .el-rows
      width 300px
      height 60px
      margin 10px auto
    .el-height
      width 300px
      height 60px
      margin 10px auto
</style>
