<template lang="pug">
.main
  the-title-and-search.the-search(:title='["班级列表"]')
    template(#button)
      .btn-group.flex.flex-row.flex-start
        a-button.btn-i.flex.flex-row.justify-between.align-items-center(
          type='primary'
          @click="changeBoolean('modalClassAdd',true)"
        )
          b-icon(type='iconjia')
          span.pad-left-8 新建
        a-button.btn-i.flex.flex-row.justify-between.align-items-center.btn-i-white(type='primary')
          b-icon(type='iconxiazai')
          a.pad-left-8(href="./static/students.xls") 下载学生模板
        a-button.btn-i.flex.flex-row.justify-between.align-items-center(
          type='primary'
          ghost
          @click='delClass(undefined)'
        )
          b-icon(type='iconshanchu')
          span.pad-left-8 删除
    template(#search)
      the-search(@getSearch='searchChange')
  a-table.table(
    rowKey='id'
    size='middle'
    :columns='columnClass'
    :data-source='tableClassList'
    :pagination='false'
    :loading="loadingClassList"
    :row-selection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }'
    @change='tableSort'
  )
    template(v-slot:list='{ text, record }')
      //- a-button(type='link', :title='text', @click="getStudentList(record.id)") 查看
      .operation.flex.flex-row.justify-between.align-items-center
        .btn-link.pointer.btns-link-primary(@click="getStudentList(record)") 查看
    template(v-slot:operation='{ text, record }')
      .operation.flex.flex-row.justify-between.align-items-center
        .btn-link.pointer.btns-link-primary(@click="editClass(record)") 编辑
        .btn-column
        a-upload(
          name='file',
          :multiple="true",
          :showUploadList="false",
          @change='fileChange'
        )
          .btn-link.pointer.btns-link-primary(@click='editClass(record, false)') 导入
        .btn-column
        .btn-link.pointer.btns-link-primary(@click='delClass(record.id)') 删除
  .page.flex.flex-row.justify-end
    a-pagination(
      :size='pageConfig.size'
      :current='pageConfig.current'
      :total='pageConfig.totalSize'
      :page-size="pageConfig.pageSize"
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
    @onSubmit="modalCallback('modalClassAdd')"
    @onCancel="modalCallback('modalClassAdd')"
  )
  the-edit(
    key='modalClassEdit'
    :isEdit='true'
    :visible='modalVisibleEdit'
    @onSubmit="modalCallback('modalClassEdit')"
    @onCancel="modalCallback('modalClassEdit')"
  )
  the-list(
    key='modalStudentList'
    :visible='modalVisibleList'
    @onCancel="modalCallback('modalStudentList')"
  )
</template>
<script lang="ts">
import { Afile, BaseSearchFace } from '@/types/base';
import { EditClassFace } from '@/types/modules/classe';
import {
  Button, message, Modal, Pagination, Table, Upload,
} from 'ant-design-vue';
import {
  computed, defineAsyncComponent, defineComponent, onMounted, reactive, Ref, ref, toRaw,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    theSearch: defineAsyncComponent(() => import('@/components/Teacher/search.vue')),
    theTitleAndSearch: defineAsyncComponent(() => import('@/components/Teacher/TitleAndSearch.vue')),
    theAdd: defineAsyncComponent(() => import('./modal/Edit.vue')),
    theEdit: defineAsyncComponent(() => import('./modal/Edit.vue')),
    theList: defineAsyncComponent(() => import('./modal/List.vue')),
    aButton: Button,
    aTable: Table,
    aPagination: Pagination,
    aUpload: Upload,
    bIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
  },
  setup() {
    const store = useStore();
    // vuex true&false
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
        width: '15%',
      },
    ];
    // fetchData
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
    // pageSize change
    const onChangeSize = (_: unknown, size: number) => {
      pageConfig.pageSize = size;
      getFetchData();
    };
    // search change
    const searchChange = (keyWord: string) => {
      const { searchForm } = store.state.classe;
      const search = {
        ...searchForm, keyWord,
      };
      store.commit('classe/updateSearchForm', search); // 同步searchForm
      getFetchData();
    };
    // sort
    const tableSort = (p: unknown, f: unknown, s: {field: string;order: string}) => {
      const search: BaseSearchFace = {};
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
    // selectRowKey
    const selectedRowKeys: Ref<string[]> = ref([]);
    const onSelectChange = (selectedRowKeyP: string[]) => {
      selectedRowKeys.value = selectedRowKeyP;
    };
    // upload
    const fileCheck = (file: File) => {
      const suffix = file.name.substr(file.name.lastIndexOf('.') + 1);
      if (!['xls', 'xlsx'].includes(suffix)) {
        message.error('选择Excel格式的文件导入！');
        return false;
      } if (file.size > 1024 * 1024 * 10) {
        message.error('文件大小不能超过10MB');
        return false;
      }
      return true;
    };
    const fileChange = async (f: {file: Afile; fileList: Afile[]; event: Event}) => {
      const { file } = f;
      if (file.status === 'done' && fileCheck(file.originFileObj)) {
        const { id } = store.state.classe.classInfo;
        changeBoolean('loadingClassList', true);
        await store.dispatch('classe/uploadStudentByClass', { classId: id, file: file.originFileObj });
        getFetchData(pageConfig.current); // 用list函数 自己会关闭loading
      } else if (file.status === 'error') {
        message.destroy();
        message.error('上传失败');
      }
    };
    // record action
    const getStudentList = (v: EditClassFace) => {
      store.commit('classe/updateClassInfo', { ...toRaw(v) });
      changeBoolean('modalStudentList', true);
    };
    const editClass = (v: EditClassFace, modal = true) => {
      store.commit('classe/updateClassInfo', { ...toRaw(v) });
      if (modal)changeBoolean('modalClassEdit', true);
    };
    const modalCallback = (type: string) => {
      getFetchData(pageConfig.current);
      changeBoolean(type, false);
    };
    const delClass = (id: string|undefined) => {
      // modal—confirm可以参考磊哥的方式优化一下
      let ids = [id];
      if (!id) ids = selectedRowKeys.value;
      if (id || selectedRowKeys.value.length) {
        Modal.confirm({
          title: '删除班级',
          content: '是否删除该班级？',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: async () => {
            await store.dispatch('classe/delClass', ids);
            message.success('删除成功');
            getFetchData(pageConfig.current);
          },
        });
      } else {
        message.info('请先选择要删除的班级');
      }
    };

    onMounted(() => {
      getFetchData();
      // 更新教师列表——下拉框用，所以不传pageSize
      // 这里queryParam可以不处理，后面写教师列表的时候，用 类和接口 一起优化一下
      store.dispatch('user/getTeacherList', { pageNo: 1, queryParam: { role: 1 } });
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
      delClass,
      fileChange,
      //
      modalCallback,
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
  .the-search
    .btn-group
      .btn-i
        margin-right 16px
      .pad-left-8
        padding-left 8px
      .btn-i-white
        a
          color #ffffff
  .table
    margin-top 24px
    .operation
      margin-right 16px
      .btn-column
        width 1px
        height 14px
        background #d8d8d8
  .page
    margin 16px 0
</style>
