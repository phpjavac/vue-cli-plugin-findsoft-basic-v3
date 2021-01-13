<template lang="pug">
.main
  the-title-and-search.the-search(:title='tabTitle' @tabChange='tabChange')
    template(#button)
      .btn-group.flex.flex-row.flex-start
        a-button.btn-i.flex.flex-row.justify-between.align-items-center(
          type='primary'
          @click="changeBoolean(activeTab === 0?'modalTeacherAdd':'modalStudentAdd',true)" )
          b-icon(type='iconjia')
          span.pad-left-8 新建
        a-button.btn-i.flex.flex-row.justify-between.align-items-center(
          type='primary'
          ghost
          @click='delUser(undefined)'
        )
          b-icon(type='iconshanchu')
          span.pad-left-8 删除
    template(#search)
      the-search(@getSearch='searchChange')
  .table-container
    a-table.table(
      rowKey='code'
      size='middle'
      :columns='activeTab === 0 ? columnTeacher : columnStudent'
      :data-source='activeTab === 0 ? teacherData : studentData'
      :pagination='false'
      :loading="loadingUserList"
      :row-selection='{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }'
    )
      template(v-slot:operation='{ text, record }')
        .operation.flex.flex-row.justify-between.align-items-center
          .btn-link.pointer.btns-link-primary(@click="editUser(record)") 编辑
          .btn-column
          .btn-link.pointer.btns-link-primary(@click="resetUser(record)") 重置密码
          .btn-column
          .btn-link.pointer.btns-link-primary(@click='delUser(record.code)') 删除
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
  the-edit-student(
    key='modalStudentEdit'
    :isEdit='true'
    :visible='modalEditStudent'
    @onSubmit="modalCallback('modalStudentEdit')"
    @onCancel="modalCallback('modalStudentEdit')"
  )
  the-add-student(
    key='modalStudentAdd'
    :isEdit='false'
    :visible='modalAddStudent'
    @onSubmit="modalCallback('modalStudentAdd')"
    @onCancel="modalCallback('modalStudentAdd')"
  )
  the-edit-teacher(
    key='modalTeacherEdit'
    :isEdit='true'
    :visible='modalEditTeacher'
    @onSubmit="modalCallback('modalTeacherEdit')"
    @onCancel="modalCallback('modalTeacherEdit')"
  )
  the-add-teacher(
    key='modalTeacherAdd'
    :isEdit='false'
    :visible='modalAddTeacher'
    @onSubmit="modalCallback('modalTeacherAdd')"
    @onCancel="modalCallback('modalTeacherAdd')"
  )
</template>

<script lang="ts">
import { BaseSearchFace } from '@/types/base';
import { EditUserFace } from '@/types/modules/user';
import {
  Button, message, Modal, Pagination, Table,
} from 'ant-design-vue';
import {
  computed,
  defineAsyncComponent, defineComponent, onMounted, reactive, Ref, ref, toRaw,
} from 'vue';
import { useStore } from 'vuex';
// import { useGetters } from 'vuex-composition-helpers';

export default defineComponent({
  components: {
    theSearch: defineAsyncComponent(() => import('@/components/Teacher/search.vue')),
    theTitleAndSearch: defineAsyncComponent(() => import('@/components/Teacher/TitleAndSearch.vue')),
    theEditStudent: defineAsyncComponent(() => import('./modal/EditStudent.vue')),
    theAddStudent: defineAsyncComponent(() => import('./modal/EditStudent.vue')),
    theEditTeacher: defineAsyncComponent(() => import('./modal/EditTeacher.vue')),
    theAddTeacher: defineAsyncComponent(() => import('./modal/EditTeacher.vue')),
    aButton: Button,
    aTable: Table,
    aPagination: Pagination,
    bIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
  },
  props: {},
  setup() {
    const store = useStore();
    const activeTab = ref(0); // 0教师 1学生
    const tabTitle = computed(() => {
      let title: string[] = [];
      if (store.state.user.user.admin) {
        title = ['教师列表', '学生列表'];
      } else if (store.state.user.user.teacher) {
        title = ['学生列表'];
      } else {
        title = [];
      }
      return title;
    });
    // vuex true&false
    const changeBoolean = (name: string, type: boolean) => {
      store.commit('user/changeBoolean', { name, type });
    };
    // table
    const pageConfig = reactive({
      current: 1, // 当前页
      pageSize: 10, // 每页条数
      totalSize: 0, // 总条数
      options: ['10', '20', '30', '40', '50'], // 选项
      size: 'small', // 尺寸
      showJumper: false, // 是否显示跳页
      showSize: false, // 是否显示条数切换
    });
    const columnTeacher = [
      {
        title: '账号',
        dataIndex: 'code',
        key: 'code',
        ellipsis: true,
        // sorter: true,
        width: '10%',
      },
      {
        title: '教师姓名',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        // sorter: true,
        width: '65%',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        slots: { customRender: 'operation' },
        width: '15%',
      },
    ];
    const columnStudent = [
      {
        title: '账号',
        dataIndex: 'code',
        key: 'code',
        ellipsis: true,
        // sorter: true,
        width: '15%',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        // sorter: true,
        width: '10%',
      },
      {
        title: '班级',
        dataIndex: 'className',
        key: 'className',
        ellipsis: true,
        // sorter: true,
        width: '50%',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        slots: { customRender: 'operation' },
        width: '15%',
      },
    ];
    // selectRowKey
    const selectedRowKeys: Ref<string[]> = ref([]);
    const onSelectChange = (selectedRowKeyP: string[]) => {
      selectedRowKeys.value = selectedRowKeyP;
    };
    // fetchData
    const getFetchData = async (page = 1) => {
      selectedRowKeys.value.length = 0;
      changeBoolean('loadingUserList', true);
      const { searchForm } = store.state.user;
      const { pageSize } = pageConfig;
      const search = {
        ...searchForm, pageNo: page, pageSize,
      };
      store.commit('user/updateSearchForm', search); // 同步searchForm
      const path = activeTab.value === 0 ? 'user/getTeacherList' : 'user/getStudentList';
      const { pageNo, totalRecords } = await store.dispatch(path, search); // 同步数据
      pageConfig.current = pageNo;
      pageConfig.totalSize = totalRecords;
      changeBoolean('loadingUserList', false);
    };
    // pageSize change
    const onChangeSize = (_: unknown, size: number) => {
      pageConfig.pageSize = size;
      getFetchData();
    };
    // sort
    const tableSort = (p: unknown, f: unknown, s: {field: string;order: string}) => {
      const search: BaseSearchFace = {};
      const { searchForm } = store.state.user;
      if (s.order) {
        search.sortName = s.field;
        search.sortDesc = s.order === 'ascend';
      } else {
        search.sortName = undefined;
        search.sortDesc = undefined;
      }
      store.commit('user/updateSearchForm', { ...searchForm, ...search }); // 同步searchForm
      getFetchData();
    };
    const tabChange = (name: string) => {
      activeTab.value = name === '教师列表' ? 0 : 1;
      selectedRowKeys.value.length = 0;
      getFetchData();
    };
    const searchChange = (value: string) => {
      const { searchForm } = store.state.user;
      const search = { ...searchForm, keyWord: value || undefined };
      store.commit('user/updateSearchForm', search);
      getFetchData();
    };
    // record
    const editUser = (record: EditUserFace) => {
      const commitPath = activeTab.value === 0 ? 'user/updateTeacherInfo' : 'user/updateStudentInfo';
      const booleanPath = activeTab.value === 0 ? 'modalTeacherEdit' : 'modalStudentEdit';
      store.commit(commitPath, { ...toRaw(record) });
      changeBoolean(booleanPath, true);
    };
    const resetUser = (record: EditUserFace) => {
      Modal.confirm({
        title: '系统提示',
        content: `你确定要把该用户(${record.name})的密码重置为123456吗?`,
        okText: '确定',
        // okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          await store.dispatch('user/resetPassword', record.code);
          message.success('重置成功');
          getFetchData(pageConfig.current);
        },
      });
    };
    const delUser = (code: string|undefined) => {
      let ids = [code];
      if (!code) ids = selectedRowKeys.value;
      if (code || selectedRowKeys.value.length) {
        Modal.confirm({
          title: '删除用户',
          content: '是否删除该用户？',
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: async () => {
            await store.dispatch('user/delUser', { ids, type: activeTab.value });
            message.success('删除成功');
            getFetchData(pageConfig.current);
          },
        });
      } else {
        message.info('请先选择要删除的用户');
      }
    };
    const modalCallback = (type: string) => {
      getFetchData(pageConfig.current);
      changeBoolean(type, false);
    };

    onMounted(() => {
      if (sessionStorage.getItem('role') === 'admin') {
        tabChange('教师列表');
      } else {
        tabChange('学生列表');
      }
      // 获取班级列表——供模态框
      store.dispatch('classe/getClassList', { pageNo: 1 });
    });

    return {
      // tab
      activeTab,
      searchChange,
      tabChange,
      tabTitle,
      changeBoolean,
      // table
      columnTeacher,
      columnStudent,
      tableSort,
      onChangeSize,
      getFetchData,
      pageConfig,
      selectedRowKeys,
      onSelectChange,
      editUser,
      resetUser,
      delUser,
      modalCallback,
      // loading & modal
      teacherData: computed(() => store.state.user.teacherData),
      studentData: computed(() => store.state.user.studentData),
      loadingUserList: computed(() => store.state.user.loadingUserList),
      modalEditStudent: computed(() => store.state.user.modalStudentEdit),
      modalAddStudent: computed(() => store.state.user.modalStudentAdd),
      modalEditTeacher: computed(() => store.state.user.modalTeacherEdit),
      modalAddTeacher: computed(() => store.state.user.modalTeacherAdd),
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
  .table-container
    .table
      margin 22px 0 16px
      .operation
        margin-right 16px
        .btn-column
          width 1px
          height 14px
          background #d8d8d8
</style>
