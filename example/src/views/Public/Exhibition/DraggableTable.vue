<template lang="pug">
.main
  PageHeader(title='表格拖拽')
  template(v-for='(v,k) in demoList',:key='k')
    a-draggable-table(v-bind='v',
    @end='onTableDragEnd',
    @selectChange='onTableSelect')
      template(#list='{ record }')
        .operation.flex.flex-row.justify-between.align-items-center
          .btn-link.pointer.btns-link-primary() 查看
      template(v-slot:operation='{ text, record }')
        .operation.flex.flex-row.justify-between.align-items-center
          .btn-link.pointer.btns-link-primary() 编辑
          .btn-column
          .btn-link.pointer.btns-link-primary() 删除
    .mb10
  
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    aDraggableTable:defineAsyncComponent(()=>import('@/components/Public/DraggableTable/index.vue'))
  },
  props: {},
  setup() {
    const store = useStore();
    // vuex true&false
    const changeBoolean = (name: string, type: boolean) => {
      store.commit('classe/changeBoolean', { name, type });
    };
    const tableClassList = ref([])
    const columnClass = [
      {
        title: '班级名称',
        dataIndex: 'name',
        ellipsis: true,
      },
      {
        title: '班级人数',
        dataIndex: 'stuNum',
        ellipsis: true,
      },
      {
        title: '学生明细',
        dataIndex: 'list',
        slots: { customRender: 'list' },
        ellipsis: true,
      },
      {
        title: '所属教师',
        dataIndex: 'userNames',
        ellipsis: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
        width: '15%',
      },
    ];
    const pageConfig = reactive({
      current: 1, // 当前页
      pageSize: 3, // 每页条数
      totalSize: 0, // 总条数
      options: ['10', '20', '30', '40', '50'], // 选项
      size: 'small', // 尺寸
      showJumper: false, // 是否显示跳页
      showSize: false, // 是否显示条数切换
    });
    // fetchData
    const getFetchData = async (page = 1) => {
      changeBoolean('loadingClassList', true);
      const { searchForm } = store.state.classe;
      const { pageSize } = pageConfig;
      const search = {
        ...searchForm, pageNo: page, pageSize,
      };
      store.commit('classe/updateSearchForm', search); // 同步searchForm
      const { pageNo, totalRecords,list } = await store.dispatch('classe/getClassList', search); // 同步数据
      tableClassList.value = list
      console.log(list);
      pageConfig.current = pageNo;
      pageConfig.totalSize = totalRecords;
      changeBoolean('loadingClassList', false);
    };
    onMounted(() => {
      getFetchData();
      // 更新教师列表——下拉框用，所以不传pageSize
      // 这里queryParam可以不处理，后面写教师列表的时候，用 类和接口 一起优化一下
      store.dispatch('user/getTeacherList', { pageNo: 1, queryParam: { role: 1 } });
    });
    const loadingClassList = computed(() => store.state.classe.loadingClassList);
    const onTableDragEnd = (list: []) => {
      console.log(list,'this is list');
    };
    const onTableSelect = ({ selectRowKeys: rowKeys }: {selectRowKeys: string[]}) => {
      console.log(rowKeys,'this is selectKey');
    }
    const demoList = ref([
      {
        columns:columnClass,
        dataSource:tableClassList,
        loading:loadingClassList,
        rowSelect:true,
        bordered:false
      },
      {
        columns:columnClass,
        dataSource:tableClassList,
        loading:loadingClassList,
        rowSelect:false,
        bordered:true
      },
      {
        columns:columnClass,
        dataSource:tableClassList,
        loading:loadingClassList,
        rowSelect:true,
        bordered:true
      }
    ]);
    return {
      tableClassList,
      loadingClassList,
      columnClass,
      demoList,
      onTableDragEnd,
      onTableSelect
    };
  },
});
</script>

<style lang="stylus" scoped>
.mb10
  margin-bottom 10px
</style>
