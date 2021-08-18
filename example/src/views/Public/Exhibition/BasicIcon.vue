<template lang="pug">
.main
  PageHeader#header(title='基础Icon展示')
  h2 base-icon
  .icon-main
    icon-card.icon-item(v-for='i in iconList', v-bind='i', :key='i.type',@click='getIcon(i)',:ref='i.type')
  h2 svg-icon
  .icon-main
    icon-card.icon-item(v-for='i in svgList', v-bind='i', :key='i.type',@click='getIcon(i)',:ref='i.type')
  h2
    a(href='https://2x.antdv.com/components/icon-cn') 点击查看ant-design-vue icon
  #copy-text(style='display:none') copy
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import { svgNames } from '@/icons/svg';
import { BasicIconJson, IIcon } from './index';

export default defineComponent({
  name: 'DistributeModalView',
  components: {
    aButton: Button,
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    iconCard: defineAsyncComponent(() => import('@/components/Public/BasicIcon/index.vue')),
  },
  setup(this) {
    const colors = [
      '#CC0000', '#E63F00', '#EE7700 ', '#DDAA00', '#EEEE00', '#99DD00', '#66DD00', '#00DD00', '#00DD77', '#00DDAA', '#00DDDD', '#009FCC', '#0044BB', '#444444',
    ];
    const iconList: IIcon[] = [...BasicIconJson.glyphs].map((v, k) => ({
      type: `icon${v.font_class}`,
      text: v.name,
      color: colors[k],
    }));
    const svgList: IIcon[] = [...svgNames].map((v, k) => ({
      type: v,
      text: v,
      color: colors[k],
      svgType: true,
    }));
    const getIcon = (v: IIcon) => {
      console.log(v.type);
    };

    return {
      iconList,
      getIcon,
      svgList,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .icon-main
    .icon-item
      display inline-block
      min-width 100px
      padding 0 20px
      height 140px
      margin 10px
</style>
  