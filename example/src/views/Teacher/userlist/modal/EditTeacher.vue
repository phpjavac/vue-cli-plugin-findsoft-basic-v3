<template lang="pug">
a-modal.main(
  :title="props.isEdit?'编辑教师':'添加教师'"
  v-model:visible='props.visible'
  @cancel='onCancel'
)
  a-form(:label-col="labelCol", :wrapper-col="wrapperCol", :model='formModel', :rules='formRule')
    a-form-item(label="账号", name='code', v-bind="validateInfos.code")
      a-input(v-model:value='formModel.code', placeholder='填写账号', :maxlength="30", :disabled='props.isEdit')
    a-form-item(label="姓名", name='name', v-bind="validateInfos.name")
      a-input(v-model:value='formModel.name', placeholder='填写姓名', :maxlength="30")
    a-form-item(label="密码") 初始密码为123456
  template(#footer)
    a-config-provider(:auto-insert-space-in-button="false")
      a-button.btns-w-80(key='back', type='primary', ghost @click='onCancel') 取消
    a-config-provider(:auto-insert-space-in-button="false")
      a-button.btns-w-80(key='submit', type='primary', @click='onSubmit') 保存
</template>

<script lang="ts">
import { EditUserFace } from '@/types/modules/user';
import { useForm } from '@ant-design-vue/use';
import {
  Button, ConfigProvider, Form, Input, message, Modal,
} from 'ant-design-vue';
import {
  defineComponent, reactive, SetupContext, toRaw, watch,
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
  },
  setup(props, context: SetupContext) {
    const store = useStore();
    const formModel: EditUserFace = reactive({
      name: undefined, code: undefined, classId: undefined, isTeacher: true,
    });
    const formRule = reactive({
      name: [
        { required: true, message: '请填写姓名', trigger: 'blur' },
      ],
      code: [
        { required: true, message: '请填写账号', trigger: 'blur' },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(formModel, formRule);
    // ⭐Update the loading effect after version 3
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate().then(async () => {
        const path = props.isEdit ? 'user/changeUserInfo' : 'user/createUser';
        await store.dispatch(path, toRaw(formModel)).then(() => {
          message.success(`${props.isEdit ? '编辑成功' : '编辑成功'}`);
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
        if (props.isEdit && props.visible) Object.assign(formModel, store.state.user.teacherInfo);
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
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
