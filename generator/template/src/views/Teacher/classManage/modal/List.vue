<template lang="pug">
a-modal.main(
  title='学生明细'
  destroyOnClose
  v-model:visible='props.visible'
  :width="800",
  @cancel='onCancel'
)
  a-table.table(
    rowKey='code'
    size='middle'
    :columns='columnStudent'
    :data-source='studentData'
    :pagination='false'
    :loading="loadingUserList"
  )
    template(v-slot:studentEdit='{ text, record }')
      .operation.pointer(@click="editUser(record)")
        b-icon(type='iconbianji4')
    template(v-slot:studentReset='{ text, record }')
      .operation.pointer(@click="resetUser(record)")
        b-icon(type='iconzhongzhi')
    template(v-slot:studentDelete='{ text, record }')
      .operation.pointer(@click="delUser(record.code)")
        b-icon(type='iconshanchu')
  template(#footer)
    .btn-group.flex.flex-row.justify-between
      a-button(
        key='create'
        type='primary'
        @click="changeBoolean('modalStudentAdd',true)"
        ) 创建
      .btn-right
        a-button(key='back', type='primary', ghost @click='onCancel') 取消
        a-button(key='submit', type='primary', @click='onCancel') 确定
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
    :classId='classId'
    @onSubmit="modalCallback('modalStudentEdit')"
    @onCancel="modalCallback('modalStudentEdit')"
  )
  the-add-student(
    key='modalStudentAdd'
    :isEdit='false'
    :visible='modalAddStudent'
    :classId='classId'
    @onSubmit="modalCallback('modalStudentAdd')"
    @onCancel="modalCallback('modalStudentAdd')"
  )
</template>

<script lang="ts">
import { EditUserFace } from '@/types/modules/user';
import {
  Button, ConfigProvider, message, Modal, Pagination, Table,
} from 'ant-design-vue';
import {
  computed,
  defineAsyncComponent, defineComponent, reactive, ref, SetupContext, toRaw, watch,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    theEditStudent: defineAsyncComponent(() => import('../../userlist/modal/EditStudent.vue')),
    theAddStudent: defineAsyncComponent(() => import('../../userlist/modal/EditStudent.vue')),
    aModal: Modal,
    aTable: Table,
    aConfigProvider: ConfigProvider,
    aButton: Button,
    aPagination: Pagination,
    bIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
  },
  props: {
    visible: {
      type: Boolean,
      defalut: () => false,
    },
    searchNum: {
      type: Number,
      default: () => 0,
    },
  },
  setup(props, context: SetupContext) {
    const store = useStore();
    const classId = ref(''); // 班级传给用户模态的classId
    // vuex true&false
    const changeBoolean = (name: string, type: boolean) => {
      store.commit('user/changeBoolean', { name, type });
    };
    // table
    const pageConfig = reactive({
      current: 1, // 当前页
      pageSize: 5, // 每页条数
      totalSize: 0, // 总条数
      options: ['10', '20', '30', '40', '50'], // 选项
      size: 'small', // 尺寸
      showJumper: true, // 是否显示跳页
      showSize: false, // 是否显示条数切换
    });
    const columnStudent = [
      {
        title: '账号',
        dataIndex: 'code',
        key: 'code',
        ellipsis: true,
        // sorter: true,
        width: '20%',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        // sorter: true,
        width: '20%',
      },
      {
        title: '编辑',
        slots: { customRender: 'studentEdit' },
        width: '10%',
      },
      {
        title: '重置',
        slots: { customRender: 'studentReset' },
        width: '10%',
      },
      {
        title: '删除',
        slots: { customRender: 'studentDelete' },
        width: '10%',
      },
    ];
    // fetchData
    const getFetchData = async (page = 1) => {
      changeBoolean('loadingUserList', true);
      const { searchForm } = store.state.user;
      const { pageSize } = pageConfig;
      const search = {
        ...searchForm, pageNo: page, pageSize, classId: classId.value,
      };
      store.commit('user/updateSearchForm', search); // 同步searchForm
      const { pageNo, totalRecords } = await store.dispatch('user/getStudentList', search); // 同步数据
      pageConfig.current = pageNo;
      pageConfig.totalSize = totalRecords;
      changeBoolean('loadingUserList', false);
    };
    // pageSize change
    const onChangeSize = (_: unknown, size: number) => {
      pageConfig.pageSize = size;
      getFetchData();
    };
    // record
    const editUser = (record: EditUserFace) => {
      store.commit('user/updateStudentInfo', { ...toRaw(record) });
      changeBoolean('modalStudentEdit', true);
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
      Modal.confirm({
        title: '删除用户',
        content: '是否删除该用户？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          await store.dispatch('user/delUser', { ids: [code], type: 1 });
          message.success('删除成功');
          getFetchData(pageConfig.current);
        },
      });
    };

    // callback
    const modalCallback = (type: string) => {
      getFetchData(pageConfig.current); // 刷新列表
      changeBoolean(type, false);
    };
    const onCancel = () => {
      store.commit('user/updateSearchForm', { pageNo: 1, pageSize: 10 }); // 关闭后，恢复用户模块的查询条件
      context.emit('on-cancel');
    };

    watch(
      () => props.visible,
      () => {
        if (props.visible) {
          store.commit('user/updateSearchForm', { pageNo: 1, pageSize: pageConfig.pageSize }); // 重置基础条件
          classId.value = store.state.classe.classInfo.id || ''; // 同步学生模态框classId
          getFetchData();
        }
      },
      { deep: true },
    );

    return {
      props,
      onCancel,
      classId,
      // table
      changeBoolean,
      pageConfig,
      columnStudent,
      modalCallback,
      onChangeSize,
      getFetchData,
      editUser,
      resetUser,
      delUser,
      // loading & modal
      modalEditStudent: computed(() => store.state.user.modalStudentEdit),
      modalAddStudent: computed(() => store.state.user.modalStudentAdd),
      loadingUserList: computed(() => store.state.user.loadingUserList),
      studentData: computed(() => store.state.user.studentData),
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .page
    margin-top 10px
</style>
