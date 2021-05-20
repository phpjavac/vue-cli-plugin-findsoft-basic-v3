<template lang="pug">
a-modal.qu-wrap(:visible="visible",width="800px",@cancel="handleCancel")
  template(#title)
    div.qu-title 编辑题目
  a-form(layout="vertical")
    a-form-item(label="题型",:wrapperCol="{span:8}")
      a-select(v-model:value="dataClone.questionType",@change="handleQTypeChange($event,dataClone)")
        a-option(v-for="(q,qIndex) in questionTypes",:value="qIndex") {{q.name}}
  component(:is="currentComponent(dataClone.questionType)",@emit-validate="handleEmitValidate")
  template(#footer)
    a-button.mr8(@click="handleCancel") 取消
    a-button(type="primary",@click="handleOk",:loading="loading") 确定
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineComponent, provide, reactive, watch } from 'vue';
import { cloneDeep } from 'lodash';
import { Button, Form, Modal, Select } from 'ant-design-vue';
import Single from './Single.vue';
import Multiple from './Multiple.vue';
import TrueOrFalse from './TrueOrFalse.vue';
import Blank from './Blank.vue';
import { questionTypes, reverseData } from './lib/index';
import { ParseQuestionI, Question, PMeta } from './lib/interface';

export default defineComponent({
  name: 'Question',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => new Question(),
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    aModal: Modal,
    aForm: Form,
    aFormItem: Form.Item,
    aSelect: Select,
    aOption: Select.Option,
    Single,
    Multiple,
    TrueOrFalse,
    Blank,
    aButton: Button,
  },
  emits: ['ok', 'cancel'],
  setup(props, { emit }) {
    const newKey = {
      pMetas: [] as PMeta[],
      pAnswer: [] as Array<number | string | boolean | undefined>,
    };
    const dataClone = (reactive(
      cloneDeep({ ...props.data, ...newKey }),
    ) as unknown) as ParseQuestionI;

    const handleQTypeChange = (qtype: number, dClone: ParseQuestionI) => {
      switch (qtype) {
        case 0:
          dClone.pAnswer = [undefined];
          break;
        case 1:
          dClone.pAnswer = [];
          break;
        case 2:
          dClone.pAnswer = [undefined];
          dClone.pMetas = [];
          break;
        default:
          dClone.pAnswer = [''];
          dClone.pMetas = [];
      }
    };

    watch(
      () => props.data as Question,
      (data: Question) => {
        Object.assign(dataClone, reactive(cloneDeep({ ...data, ...newKey })));
      },
      { deep: true },
    );
    watch(
      () => props.visible,
      (v: boolean) => {
        if (!v) Object.assign(dataClone, reactive(cloneDeep({ ...props.data, ...newKey })));
      },
    );

    provide('dataClone', dataClone);

    const currentComponent = (qtype: number) =>
      ['Single', 'Multiple', 'TrueOrFalse', 'Blank'][qtype];

    /**
     * 校验函数
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let validate: Function = () => {};
    const handleEmitValidate = (va: Function) => {
      validate = va;
    };

    const handleOk = () => {
      const isValid = validate();
      if (isValid) {
        emit('ok', reverseData(dataClone));
      }
    };

    const handleCancel = () => {
      emit('cancel');
    };

    return {
      dataClone,
      questionTypes,
      handleQTypeChange,
      currentComponent,
      handleOk,
      handleCancel,
      handleEmitValidate,
    };
  },
});
</script>
<style lang="stylus" scoped>
.qu-wrap
  font-size 14px
  .qu-title
    font-size: 16px;
    font-family: MicrosoftYaHeiUI-Bold, MicrosoftYaHeiUI;
    font-weight: bold;
    color: rgba(42, 46, 54, 0.8);
    line-height: 20px;
    height 20px
    text-align center
</style>
