<template lang="pug">
a-form(layout="vertical")
  a-form-item(label="题目")
    Editor(v-model="dataClone.stem",ref="stem",@mounted="onEditorMounted(0, $event)")
  a-form-item(label="选项")
    a-radio-group(v-model:value="dataClone.pAnswer[0]")
      div.smi-wrap(v-for="(meta,metaIndex) in dataClone.pMetas",:key="meta.uid")
        a-radio.sm-item(:value="metaIndex",size="large")
          a-input(v-model:value="meta.meta",:maxlength="50",:minlength="1")
        span.sm-del(:class="reachMinLimit?'disabled':''")
          DeleteOutlined.btn-gray(@click.native.stop="handleDelMetaClick(metaIndex)",
          type="link",
          size="small")
    .flex.justify-center
      a-button.sm-add-meta(block,@click="handleAddMetaClick",type="dashed",:disabled="reachMaxLimit")
        PlusOutlined
        span 添加选项
  a-form-item(label="题目分值")
    a-input-number(v-model:value="dataClone.score",:max="20",:min="1")
  a-form-item(label="解析")
    Editor(v-model="dataClone.analysis",@mounted="onEditorMounted(1, $event)")
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  computed, defineComponent, inject, onMounted, reactive, watch,
} from 'vue';
import {
  Form, InputNumber, Radio, Select, Button, Input, message,
} from 'ant-design-vue';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import Editor from '@/components/Editor.vue';
import WangEditor from 'wangeditor';
import { uniqBy, uniqueId } from 'lodash';
import { ParseQuestionI } from './lib/interface';

export default defineComponent({
  name: 'Single',
  components: {
    Editor,
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aInputNumber: InputNumber,
    aSelect: Select,
    aOption: Select.Option,
    aRadio: Radio,
    aRadioGroup: Radio.Group,
    PlusOutlined,
    DeleteOutlined,
    aButton: Button,
  },
  emits: ['emit-validate'],
  setup(props, { emit }) {
    const dataClone = inject('dataClone') as ParseQuestionI;

    watch(() => dataClone, (data) => {
      Object.assign(dataClone, data);
    }, { deep: true });

    const handleAddMetaClick = () => {
      dataClone.pMetas.push({
        uid: uniqueId(),
        meta: '',
      });
    };

    const handleDelMetaClick = (metaIndex: number) => {
      dataClone.pMetas.splice(metaIndex, 1);
    };

    const reachMaxLimit = computed(() => dataClone.pMetas.length >= 4);

    const reachMinLimit = computed(() => dataClone.pMetas.length <= 2);

    const stemEditor = reactive({}) as WangEditor;
    const analyEditor = reactive({}) as WangEditor;
    const validate = () => {
      if (!stemEditor.txt.text().length) {
        message.error('题目输入字数不满足限制，请重新输入！');
        return false;
      }
      if (dataClone.pMetas.some((d) => !d.meta.length)) {
        message.error('选项输入字数不满足限制，请重新输入！');
        return false;
      }
      if (dataClone.pMetas.length < 2) {
        message.error('请输入至少两个选项！');
        return false;
      }
      if (uniqBy(dataClone.pMetas, 'meta').length !== dataClone.pMetas.length) {
        message.error('选项内容不能重复！');
        return false;
      }
      if (!dataClone.pAnswer.length || Number.isNaN(dataClone.pAnswer[0]) || dataClone.pAnswer[0] === undefined) {
        message.error('请选择答案！');
        return false;
      }
      if (!analyEditor.txt.text().length) {
        message.error('解析输入字数不满足限制，请重新输入！');
        return false;
      }
      return true;
    };

    onMounted(() => {
      if (!dataClone.pAnswer.length) dataClone.pAnswer.push(0);
      emit('emit-validate', validate);
    });

    const onEditorMounted = (index: number, editor: WangEditor) => {
      if (index === 0) Object.assign(stemEditor, reactive(editor) as WangEditor);
      if (index === 1) Object.assign(analyEditor, reactive(editor) as WangEditor);
    };

    return {
      dataClone,
      stemEditor,
      analyEditor,
      validate,
      reachMaxLimit,
      reachMinLimit,
      handleAddMetaClick,
      handleDelMetaClick,
      onEditorMounted,
    };
  },
});
</script>
<style lang="stylus" scoped>
.sm-del
  bottom: 3px;
  top: 2px;
  right: -7px;
  position: absolute;
  font-size: 24px;
  line-height 24px
  width 24px
  height 24px
.smi-wrap
  position relative
.sm-item
  display block
  margin-right 0
  margin-bottom 24px
  vertical-align middle
  :deep().ant-radio
    transform scale(1.5)
  :deep().ant-input
    width 664px
    margin-left 16px
    margin-right 24px
  :deep().ant-btn
    margin-top 6px
.btn-gray
  color rgba(217, 217, 217, 1)
.disabled
  cursor not-allowed
  z-index 1
  >*
    pointer-events none
.sm-add-meta
  width 664px
  margin-left -8px
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 20px;
</style>
