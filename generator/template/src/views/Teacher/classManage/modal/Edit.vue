<template lang="pug">
a-modal.main(
  :title="props.isEdit?'编辑班级':'创建班级'"
  v-model:visible='props.visible'
  @cancel='onCancel'
)
  a-form(:label-col="labelCol", :wrapper-col="wrapperCol", :model='formModel', :rules='formRule')
    a-form-item(label="班级名称", name='name', v-bind="validateInfos.name")
      a-input(v-model:value='formModel.name', placeholder='填写班级名称', :maxlength="30")
    a-form-item(label="班级描述", name='remark', v-bind="validateInfos.remark")
      a-text-area(v-model:value='formModel.remark', placeholder='请输入班级描述', :maxlength="100",:showCount='false', style='height:50px;')
    a-form-item(label='班级教师', name='teacherId',v-bind='validateInfos.teacherId')
      a-select(
        v-model:value='formModel.teacherId'
        placeholder='请选择'
        :disabled="props.isEdit"
        :default-active-first-option="false"
        :filterOption='false'
      )
        a-select-option( v-for="v in selectTeachers" :key="v.code" :value='v.code') {{v.name}}
  template(#footer)
    a-button(key='back', type='primary', ghost @click='onCancel') 取消
    a-button(key='submit', type='primary', @click='onSubmit') 保存
</template>

<script lang="ts">
import {
  Button, ConfigProvider, Form, Input, message, Modal, Select,
} from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import {
  computed,
  defineComponent, reactive, SetupContext, toRaw, watch,
} from 'vue';
import { useStore } from 'vuex';
import { EditClassFace } from '@/types/modules/classe';

export default defineComponent({
  components: {
    aModal: Modal,
    aConfigProvider: ConfigProvider,
    aButton: Button,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aTextArea: Input.TextArea,
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
    formData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context: SetupContext) {
    const store = useStore();
    const formModel: EditClassFace = reactive({
      id: undefined,
      name: '',
      remark: undefined,
      teacherId: undefined,
    });
    const formRule = reactive({
      name: [
        { required: true, message: '请填写班级名称', trigger: 'blur' },
      ],
      remark: [
        { required: true, message: '请填写班级描述', trigger: 'blur' },
      ],
      teacherId: [
        { required: true, message: '请选择教师', trigger: 'change' },
      ],
    });
    const { resetFields, validate, validateInfos } = useForm(formModel, formRule);
    // ⭐Update the loading effect after version 3
    const onSubmit = (e: Event) => {
      e.preventDefault();
      validate().then(async () => {
        await store.dispatch('classe/editClassData', toRaw(formModel)).then(() => {
          message.success(`${props.isEdit ? '修改成功' : '新增成功'}`);
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
        if (props.isEdit && props.visible) {
          Object.assign(formModel, store.state.classe.classInfo);
        }
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
      selectTeachers: computed(() => store.state.user.teacherData),
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
