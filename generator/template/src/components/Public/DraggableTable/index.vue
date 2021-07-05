<template lang="pug">
.DraggableTable
  a-spin(:spinning="loading")
    table.drag-table(:class='bordered?"has-border-top-left":"no-border-top"', :boolean='bordered')
      thead(:style='tHeadStyle')
        tr.drag-thead-tr
          th.drag-th.td.checkbox(v-if='rowSelect',:class='bordered?"has-border-bottom-right":"no-border-bottom"')
            a-checkbox(v-model:checked="isAllCheck",@change="checkAll")
          th.drag-th.td(v-for='item in columns',:key='item.key',
          :class='{ellipsis: item.ellipsis}, bordered?"has-border-bottom-right":"no-border-bottom"',
          :style='{"text-align": item.align || "left", "width": item.width || "auto", "flex": `${item.width ? "none" : 1}`}') {{item.title}}
      Draggable(v-if='dragData.length !== 0',v-model='dragData',tag='tbody',@end="onDragEnd",item-key="uid")
        template(#item="{ element,index }")
          tr.drag-item.tr.cursor-move(:key='element.uid')
            td.td.checkbox(v-if='rowSelect',:class='bordered?"has-border-bottom-right":"no-border-bottom"')
              a-checkbox(v-model:checked="element.isChecked",@change="checkChange(element, index)")
            template(v-for='col in columns',:key='col.dataIndex')
              td.td(:class='{ellipsis: col.ellipsis}, bordered?"has-border-bottom-right":"no-border-bottom"'
              :style='{"text-align": col.align || "left", "width": `${col.width} !important` || "auto", "flex": `${col.width ? "none" : 1}`}'
              :title='col.slots ? "" : element[col.dataIndex]')
                slot(v-if='col.slots',:name='col.slots.customRender',:record='element',:index='index')
                span(v-else) {{element[col.dataIndex]}}
      tbody(v-else)
        tr
          td.border-right-bottom(:colspan='columns.length + (rowSelect ? 1 : 0)')
            a-empty(:image="simpleImage")
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, SetupContext, watch, toRaw,
} from 'vue';
import { Checkbox, Empty, Spin } from 'ant-design-vue';
import Draggable from 'vuedraggable';
import { cloneDeep, uniqueId } from 'lodash';
import { IProps, IColumns, IBaseRecord } from "./lib/index";

export default defineComponent({
  components: {
    Draggable,
    aCheckbox: Checkbox,
    aEmpty: Empty,
    aSpin: Spin,
  },
  emits: ['select-change', 'end'],
  props: {
    /** 表格数据  v-model:dataSource */
    dataSource: {
      type: Array as PropType<Array<IBaseRecord>>,
      default() {
        return [];
      },
    },
    /** 表格列 */
    columns: {
      type: Array as PropType<Array<IColumns>>,
      default: () => [],
    },
    /** 表格loading状态 */
    loading: {
      type: Boolean,
      default: false,
    },
    /** bordered */
    bordered: {
      type: Boolean,
      default: true,
    },
    /** 复选框 */
    rowSelect: {
      type: Boolean,
      default: true,
    },
    /** 根据 rowSelectKey 返回选中值 ——noYet 暂时没想到怎么用，会抱错 */
    rowSelectKey: {
      type: String,
      default: 'id',
    },
    /** table-head-style */
    tHeadStyle: {
      type: Object,
      default: () => ({}),
    },
    /** option 🔗https://github.com/SortableJS/Sortable#options */
    /** table 🔗https://github.com/SortableJS/vue.draggable.next/blob/master/example/components/table-example.vue */
    /** vue3-table的调用方式发生了变化 */
    dragOption: {
      type: Object,
      default: () => ({
        disabled: false,
        draggable: '.dt-item',
        animation: 150,
        handle: '.td-handle',
      }),
    },
  },
  setup(props: IProps, ctx: SetupContext) {
    /** model-data */
    const dragData = ref<IBaseRecord[]>([]);
    const isAllCheck = ref(false);

    /** 根据rowKey获得选中ids */
    const getSelectKeys = () => dragData.value.filter((v: IBaseRecord) => v.isChecked).map((v: IBaseRecord) => v.id);

    const checkAll = () => {
      dragData.value.forEach((d: IBaseRecord) => {
        d.isChecked = isAllCheck.value;
      });
      ctx.emit('select-change', { selectRowKeys: getSelectKeys() });
    };
    const checkChange = () => {
      isAllCheck.value = dragData.value.every((d: IBaseRecord) => d.isChecked);
      ctx.emit('select-change', { selectRowKeys: getSelectKeys() });
    };

    /** 拖拽结束 */
    const onDragEnd = () => {
      console.log(props.loading);
      const newList = cloneDeep(toRaw(dragData.value)).map((d: IBaseRecord, i: number) => ({ ...d, seq: i }));
      ctx.emit('end', newList);
    };

    watch(() => props.dataSource, async (newV) => {
      if (newV) {
        dragData.value = (cloneDeep(toRaw(props.dataSource)) as IBaseRecord[]).map((d: IBaseRecord) => ({ ...d, uid: uniqueId(''), isChecked: false }));
      }
    }, { immediate: true, deep: true });
    return {
      dragData,
      // checked
      isAllCheck,
      checkAll,
      checkChange,
      // emit
      onDragEnd,
      // empty
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
    };
  },
});
</script>

<style lang="stylus" scoped>
/** common */
.ellipsis
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
.cursor-move
  cursor move
/** 描边 */
$s-border-width = 1px // 描边宽
$s-border-color = #f0f0f0 // 描边颜色
.no-border-top // 无描边——显示上
  border-top $s-border-width solid $s-border-color
.no-border-bottom // 无描边——显示下
  border-bottom $s-border-width solid $s-border-color
.has-border-top-left // 有描边——显示左上
  border $s-border-width solid $s-border-color
  border-right 0
  border-bottom 0
.has-border-bottom-right // 有描边——显示右下
  border $s-border-width solid $s-border-color
  border-left 0
  border-top 0
/** table */
.td
  padding 16px
  overflow-wrap: break-word
.tr
  &:hover
    .td
      background rgba($primary-color, 0.07)
.checkbox
  text-align center
  width 60px
/** drag */
.DraggableTable
  overflow hidden
  width 100%
  font-weight 500
  background #ffffff
  .drag-table
    width 100%
    table-layout:fixed;

    border-radius: 4px 4px 0 0;
    border-collapse: separate;
    border-spacing: 0;
    .drag-thead-tr
      background #fafafa
      th
        font-weight 500
</style>
