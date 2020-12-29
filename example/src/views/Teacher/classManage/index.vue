<template lang="pug">
.main
  p.the-p.font-size-24 班级列表
  the-search.the-search(
    @getSearch='searchChange'
  )
    template(#btn-action)
      .btn-group.flex.flex-row.flex-start
        a-button.btn-i.btns-radius-all(
          type='primary'
          @click="changeBoolean('modalClassAdd',true)"
        ) 新建
        a-button.btn-i.btns-radius-all(type='primary') 下载学生模板
        a-button.btn-i.btns-radius-all(type='primary' ghost) 删除
  a-table.table(
    rowKey='id'
    size='middle'
    :columns='columnClass'
    :data-source='tableClassList'
    :pagination='false'
    :loading="loadingClassList"
    @change='tableSort'
    :scroll='{x:"max-content"}'
  )
    template(v-slot:list='{ text, record }')
      a-button.btn-link(type='link', :title='text', @click="getStudentList(record.id)") 查看
    template(v-slot:operation='{ text, record }')
      a-button.btn-link(type='link') 编辑
      a-button.btn-link(type='link') 导入
      a-button.btn-link(type='link') 删除
  .page.flex.flex-row.justify-end
    a-pagination.foot-pagination(
      show-quick-jumper
      showSizeChanger
      size="small"
      :current='pageConfig.current'
      :total='pageConfig.totalSize'
      :page-size-options='pageConfig.options'
      @change='getFetchData'
      @showSizeChange='onChangeSize'
    )
  //- modal
  the-add(
    key='modalClassAdd'
    :isEdit='false'
    :visible='modalVisibleAdd'
    @onSubmit='formAdd'
    @onCancel="formCancel('modalClassAdd','modalClassAdd',false)"
  )
  the-edit(
    key='modalClassEdit'
    :isEdit='true'
    :visible='modalVisibleEdit'
    @onSubmit='formEdit'
    @onCancel="formCancel('modalClassEdit','modalClassEdit',false)"
  )
  the-list(
    key='modalStudentList'
    :visible='modalVisibleList'
    @onCancel="formCancel('modalStudentList','modalStudentList',false)"
  )
</template>
<script lang="ts">
// import { SearchClassFace } from '@/store/modules/classManage';
import { SearchClassFace } from '@/store/modules/classManage';
import { Button, Pagination, Table } from 'ant-design-vue';
import {
  computed, defineAsyncComponent, defineComponent, onMounted, reactive,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    theSearch: defineAsyncComponent(() => import('@/components/Teacher/search.vue')),
    theAdd: defineAsyncComponent(() => import('./modal/Create.vue')),
    theEdit: defineAsyncComponent(() => import('./modal/Create.vue')),
    theList: defineAsyncComponent(() => import('./modal/List.vue')),
    aButton: Button,
    aTable: Table,
    aPagination: Pagination,
  },
  setup() {
    const store = useStore();
    // 条件被放在组件里了，查询时会同步vuex。如果比较复杂的条件，那对应组件考虑watch改变
    // const searchForm = reactive<SearchClassFace>({});
    const pageConfig = reactive({
      current: 1, // 当前页
      pageSize: 10, // 每页条数
      totalSize: 0, // 总条数
      options: ['10', '20', '30', '40', '50'], // 选项
    });
    const columnClass = [
      {
        title: '班级名称',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        sorter: true,
      },
      {
        title: '班级人数',
        dataIndex: 'number',
        key: 'number',
        ellipsis: true,
        sorter: true,
      },
      {
        title: '学生明细',
        dataIndex: 'list',
        key: 'list',
        slots: { customRender: 'list' },
        ellipsis: true,
        // sorter: true,
      },
      {
        title: '所属教师',
        dataIndex: 'teacherName',
        key: 'teacherName',
        ellipsis: true,
        sorter: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        slots: { customRender: 'operation' },
        width: 250,
      },
    ];
    // 数据
    const getFetchData = async (page = 1) => {
      store.commit('classCon/changeBoolean', { name: 'loadingClassList', type: true });
      const { searchForm } = store.state.classCon;
      const { pageSize } = pageConfig;
      const search = {
        ...searchForm, pageNo: page, pageSize,
      };
      store.commit('classCon/updateSearchForm', search); // 同步searchForm
      const { pageNo, totalRecords } = await store.dispatch('classCon/getClassList', search); // 同步数据
      pageConfig.current = pageNo;
      pageConfig.totalSize = totalRecords;
      store.commit('classCon/changeBoolean', { name: 'loadingClassList', type: false });
    };
    // 页码改变
    const onChangeSize = (_: unknown, size: number) => {
      pageConfig.pageSize = size;
      getFetchData();
    };
    // 查询改变
    const searchChange = (keyWord: string) => {
      const { searchForm } = store.state.classCon;
      const search = {
        ...searchForm, keyWord,
      };
      store.commit('classCon/updateSearchForm', search); // 同步searchForm
      getFetchData();
    };
    // 排序
    const tableSort = (s: {field: string;order: string}) => {
      const search: SearchClassFace = {};
      const { searchForm } = store.state.classCon;
      if (s.order) {
        search.sortName = s.field;
        search.sortDesc = s.order === 'ascend';
      } else {
        search.sortName = undefined;
        search.sortDesc = undefined;
      }
      store.commit('classCon/updateSearchForm', { ...searchForm, ...search }); // 同步searchForm
      getFetchData();
    };

    const getStudentList = (id: string) => {
      console.log(id);
    };

    const formAdd = () => {
      console.log('formAdd');
    };
    const formEdit = () => {
      console.log('formEdit');
    };
    const formCancel = (key: string, name: string, type: boolean) => {
      store.commit('classCon/changeBoolean', { name, type });
    };
    const changeBoolean = (name: string, type: boolean) => {
      store.commit('classCon/changeBoolean', { name, type });
    };

    onMounted(() => {
      getFetchData();
    });

    return {
      searchChange,
      changeBoolean,
      formAdd,
      formEdit,
      formCancel,
      getStudentList,
      // table
      pageConfig,
      getFetchData,
      onChangeSize,
      tableSort,
      columnClass,
      //
      tableClassList: computed(() => store.state.classCon.tableClassList),
      loadingClassList: computed(() => store.state.classCon.loadingClassList),
      modalVisibleAdd: computed(() => store.state.classCon.modalClassAdd),
      modalVisibleEdit: computed(() => store.state.classCon.modalClassEdit),
      modalVisibleList: computed(() => store.state.classCon.modalStudentList),
    };
  },
});
</script>
<style lang="stylus" scoped>
.main
  .the-p
    width 96px
    height 33px
    margin-bottom 16px
    font-size 24px
    color rgba(0,0,0,.85)
    line-height 33px
  .the-search
    .btn-group
      .btn-i
        margin-right 16px
  .table
    margin-top 24px
  .page
    margin-top 16px
</style>
