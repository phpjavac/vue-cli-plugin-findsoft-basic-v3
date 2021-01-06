<template lang="pug">
.top-bar
  a-tabs(v-if="multiple" @change="changeActive")
    a-tab-pane(v-for="(item, index) of title"
              :key="item",
              :tab="item")
  p.the-p.font-size-24(v-else) {{ title[0] }}
  .slot-container.flex.flex-row.justify-between
    slot(name="button")
    slot(name="search")
</template>

<script lang="ts">
import { Tabs } from 'ant-design-vue';
import {
  computed, defineComponent, PropType, SetupContext,
} from 'vue';

export default defineComponent({
  components: {
    aTabs: Tabs,
    aTabPane: Tabs.TabPane,
  },
  props: {
    title: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props, context: SetupContext) {
    const multiple = computed(() => {
      if (props.title.length === 1) return false;
      return true;
    });
    const changeActive = (key: string) => {
      context.emit('tab-change', key);
    };
    return {
      multiple,
      changeActive,
    };
  },
});
</script>

<style lang="stylus" scoped>
.top-bar
  .the-p
    width 96px
    height 33px
    margin-bottom 16px
    color rgba(0,0,0,.85)
    line-height 33px
  >>>.ant-tabs
    height 40px
    margin-bottom 16px
  >>>.ant-tabs-tab-disabled, >>>.ant-tabs-tab-disabled:hover
    color rgba(42, 46, 54, 0.8)
    cursor default
  >>> .ant-tabs-nav-container
    height 40px
  >>> .ant-tabs-bar
    height 40px
    margin 0
  >>> .ant-tabs-nav-container::before, .ant-tabs-nav-container::after
    margin-top 2px
  >>> .ant-tabs-nav, >>> .ant-tabs-nav-wrap, >>> .ant-tabs-nav-scroll
    height 40px
  >>> .ant-tabs-tab
    height 40px
    margin 0
    padding 10px 16px
    font-size 14px
    // font-family 'PingFangSC-Regular,PingFang SC'
    font-weight 400
    color rgba(42, 46, 54, 0.8)
    line-height 20px
</style>
