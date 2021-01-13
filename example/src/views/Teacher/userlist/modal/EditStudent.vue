<template lang="pug">
a-modal.main(
  :title="props.isEdit?'编辑学生':'添加学生'"
  v-model:visible='props.visible'
  @cancel='onCancel'
)
  a-form(:label-col="labelCol", :wrapper-col="wrapperCol", :model='formModel', :rules='formRule')
    a-form-item(label="账号", name='code', v-bind="validateInfos.code")
      a-input(v-model:value='formModel.code', placeholder='填写账号', :maxlength="20", :disabled='props.isEdit')
    a-form-item(label="姓名", name='name', v-bind="validateInfos.name")
      a-input(v-model:value='formModel.name', placeholder='填写姓名', :maxlength="20")
    //- 如果 props 存在 classId ，表示是从班级管理过来的，自带classId。不需要显示Select，否则为用户列表，需要手动选择
    a-form-item(label='班级', name='classId',v-bind='validateInfos.classId', v-if='!props.classId')
      a-select(
        v-model:value='formModel.classId'
        placeholder='请选择'
        :disabled="props.isEdit"
        :default-active-first-option="false"
        :filterOption='false'
      )
        a-select-option( v-for="v in selectClasses" :key="v.id" :value='v.id') {{v.name}}
    a-form-item(label="密码") 初始密码为123456
  template(#footer)
    a-button(key='back', type='primary', ghost @click='onCancel') 取消
    a-button(key='submit', type='primary', @click='onSubmit') 保存
</template>

<script lang="ts">
import { EditUserFace } from '@/types/modules/user';
import { useForm } from '@ant-design-vue/use';
import {
  Button, ConfigProvider, Form, Input, message, Modal, Select,
} from 'ant-design-vue';
import {
  computed, defineComponent, reactive, SetupContext, toRaw, watch,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    aModal: Modal,
    aConfigProvider: ConfigProvider,
    aButton: Button,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  props: {
    isEdit: {
      type: Boolean,
      defalut: () => false,
    },
    visible: {
      type: Boolean,
      defalut: () => false,
    },
    classId: {
      type: String,
      default: () => '',
    },
  },
  setup(props, context: SetupContext) {
    const store = useStore();
    const formModel: EditUserFace = reactive({
      name: undefined, code: undefined, classId: undefined, isTeacher: false,
    });
    const formRule = reactive({
      name: [
        { required: true, message: '请填写姓名', trigger: 'blur' },
        {
          min: 2, max: 20, message: '用户名称应在2~20字之间', trigger: 'blur',
        },
      ],
      code: [
        { required: true, message: '请填写账号', trigger: 'blur' },
        {
          min: 2, max: 20, message: '账号应在2~20字之间', trigger: 'blur',
        },
        { pattern: new RegExp(/^[0-9a-zA-Z]+$/), message: '账号只能为数字或英文', trigger: 'change' },
      ],
      classId: [
        { required: true, message: '请选择班级', trigger: 'change' },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(formModel, formRule);
    // ⭐Update the loading effect after version 3
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate().then(async () => {
        const path = props.isEdit ? 'user/changeUserInfo' : 'user/createUser';
        await store.dispatch(path, toRaw(formModel)).then(() => {
          message.success(props.isEdit ? '编辑成功' : '添加成功');
          resetFields();
          context.emit('on-submit');
        });
      });
    };
    const onCancel = () => {
      resetFields();
      context.emit('on-cancel');
    };

    watch(
      () => props.visible,
      () => {
        if (props.isEdit && props.visible) Object.assign(formModel, store.state.user.studentInfo);
        if (props.classId) formModel.classId = props.classId;
      },
      { deep: true },
    );

    return {
      props,
      onSubmit,
      onCancel,
      // form
      formModel,
      formRule,
      validateInfos,
      selectClasses: computed(() => store.state.classe.tableClassList),
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
