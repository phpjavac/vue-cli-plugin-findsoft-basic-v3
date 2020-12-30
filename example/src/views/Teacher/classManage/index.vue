<template lang="pug">
.main
  p.the-p.font-size-24 班级列表
  the-search.the-search(
    @getSearch='searchChange'
  )
    template(#btn-action)
      .btn-group.flex.flex-row.flex-start
        a-button.btn-i(
          type='primary'
          @click="changeBoolean('modalClassAdd',true)"
        ) 新建
        a-button.btn-i(type='primary') 下载学生模板
        a-button.btn-i(type='primary' ghost) 删除
  a-table.table(
    rowKey='id'
    size='middle'
    :columns='columnClass'
    :data-source='tableClassList'
    :pagination='false'
    :loading="loadingClassList"
    :row-selection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }'
    :scroll='{x:"max-content"}'
    @change='tableSort'
  )
    template(v-slot:list='{ text, record }')
      a-button.btn-link(type='link', :title='text', @click="getStudentList(record.id)") 查看
    template(v-slot:operation='{ text, record }')
      a-button.btn-link(type='link', @click="editClass(record.id)") 编辑
      a-button.btn-link(type='link') 导入
      a-button.btn-link(type='link') 删除
  .page.flex.flex-row.justify-end
    a-pagination.foot-pagination(
      :size='pageConfig.size'
      :current='pageConfig.current'
      :total='pageConfig.totalSize'
      :page-size-options='pageConfig.options'
      :show-quick-jumper='pageConfig.showJumper'
      :showSizeChanger='pageConfig.showSize'
      @change='getFetchData'
      @showSizeChange='onChangeSize'
    )
  //- modal
  the-add(
    key='modalClassAdd'
    :isEdit='false'
    :visible='modalVisibleAdd'
    @onSubmit="changeBoolean('modalClassAdd',false)"
    @onCancel="changeBoolean('modalClassAdd',false)"
  )
  the-edit(
    key='modalClassEdit'
    :isEdit='true'
    :visible='modalVisibleEdit'
    @onSubmit="changeBoolean('modalClassEdit',false)"
    @onCancel="changeBoolean('modalClassEdit',false)"
  )
  the-list(
    key='modalStudentList'
    :visible='modalVisibleList'
    @onCancel="changeBoolean('modalStudentList',false)"
  )
</template>
<script lang="ts">
import { SearchClassFace } from '@/store/modules/classManage';
import { Button, Pagination, Table } from 'ant-design-vue';
import {
  computed, defineAsyncComponent, defineComponent, onMounted, reactive, Ref, ref,
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
    // 更改true&false
    const changeBoolean = (name: string, type: boolean) => {
      store.commit('classe/changeBoolean', { name, type });
    };
    const pageConfig = reactive({
      current: 1, // 当前页
      pageSize: 10, // 每页条数
      totalSize: 0, // 总条数
      options: ['10', '20', '30', '40', '50'], // 选项
      size: 'small', // 尺寸
      showJumper: false, // 是否显示跳页
      showSize: false, // 是否显示条数切换
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
        // sorter: true, 接口报错
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
      changeBoolean('loadingClassList', true);
      const { searchForm } = store.state.classe;
      const { pageSize } = pageConfig;
      const search = {
        ...searchForm, pageNo: page, pageSize,
      };
      store.commit('classe/updateSearchForm', search); // 同步searchForm
      const { pageNo, totalRecords } = await store.dispatch('classe/getClassList', search); // 同步数据
      pageConfig.current = pageNo;
      pageConfig.totalSize = totalRecords;
      changeBoolean('loadingClassList', false);
    };
    // 页码改变
    const onChangeSize = (_: unknown, size: number) => {
      pageConfig.pageSize = size;
      getFetchData();
    };
    // 查询改变
    const searchChange = (keyWord: string) => {
      const { searchForm } = store.state.classe;
      const search = {
        ...searchForm, keyWord,
      };
      store.commit('classe/updateSearchForm', search); // 同步searchForm
      getFetchData();
    };
    // 排序
    const tableSort = (p: unknown, f: unknown, s: {field: string;order: string}) => {
      const search: SearchClassFace = {};
      const { searchForm } = store.state.classe;
      if (s.order) {
        search.sortName = s.field;
        search.sortDesc = s.order === 'ascend';
      } else {
        search.sortName = undefined;
        search.sortDesc = undefined;
      }
      store.commit('classe/updateSearchForm', { ...searchForm, ...search }); // 同步searchForm
      getFetchData();
    };

    const getStudentList = (id: string) => {
      console.log(id, '再掉一波学生列表接口');
      changeBoolean('modalStudentList', true);
    };
    const editClass = (id: string) => {
      console.log(id, '再掉一波班级详情接口');
      changeBoolean('modalClassEdit', true);
    };

    const selectedRowKeys: Ref<string[]> = ref([]);
    const onSelectChange = (selectedRowKeyP: string[]) => {
      selectedRowKeys.value = selectedRowKeyP;
    };

    onMounted(() => {
      getFetchData();
    });

    return {
      searchChange,
      changeBoolean,
      getStudentList,
      // table
      pageConfig,
      getFetchData,
      onChangeSize,
      tableSort,
      columnClass,
      selectedRowKeys,
      onSelectChange,
      editClass,
      //
      tableClassList: computed(() => store.state.classe.tableClassList),
      loadingClassList: computed(() => store.state.classe.loadingClassList),
      modalVisibleAdd: computed(() => store.state.classe.modalClassAdd),
      modalVisibleEdit: computed(() => store.state.classe.modalClassEdit),
      modalVisibleList: computed(() => store.state.classe.modalStudentList),
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
    margin 16px 0
</style>
