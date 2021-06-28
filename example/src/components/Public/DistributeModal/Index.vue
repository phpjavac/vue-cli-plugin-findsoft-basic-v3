<template lang="pug">
a-modal.dm-wrap(:visible="visible",title="分配实验",width="680px",@cancel="handleCancel")
  template(#footer)
    a-button(@click="handleCancel") 取消
    a-button(type="primary",@click="handleConfirm",:loading="saving") 确定
  a-form(:model="formState",:wraper-col="{span:21}",:label-col="{span:3}")
    Row()
      Col(span="12")
        a-form-item(label="开始时间",:label-col="{span:6}",:wraper-col="{span:18}",v-bind="formState.startTime")
          a-date-picker(v-model:value="formState.startTime",:disabledDate="startDisabled",:show-time="{format: 'HH:mm'}")
      Col(span="12")
        a-form-item(label="结束时间",:label-col="{span:6}",:wraper-col="{span:18}",v-bind="formState.endTime")
          a-date-picker(v-model:value="formState.endTime",:disabledDate="endDisabled",:show-time="{format: 'HH:mm'}")
    a-form-item(label="实验时长")
      a-input-number(v-model:value="formState.runStageTotalTime")
      ExclamationCircleOutlined(style="margin:0 8px")
      span 标准时长为20分钟，前后可增减范围为20分钟。
    Row()
      Col(span="6")
        a-form-item(label="下载报告",:label-col="{span:12}",,:wraper-col="{span:12}")
          a-switch(v-model:checked="formState.viewReport")
      Col(span="6")
        a-form-item(label="查看答案",:label-col="{span:12}",,:wraper-col="{span:12}")
          a-switch(v-model:checked="formState.viewAnswer")
    a-form-model-item(
      label='选择班级',
      :labelCol='{ span: 3 }',
      :wrapperCol='{ span: 21 }'
    )
      .ant-input(
        style='margin:4px 0;display:block;height:auto;min-height:34px;'
      )
        a-tag(
          v-for='cla in checkedClass',
          :key='cla.id',
          closable,
          @close='handleTagClose(cla.id)'
        ) {{ cla.name }}
      .dic-main
        .dic-left
          template(v-if='classList.length')
            .dicl-item(
              v-for='(cla, claIdx) in classList',
              :key='cla.id',
              @click='handleClassClick(cla, claIdx)'
            )
              a-checkbox(
                v-model:checked='cla.checked',
                @change='handleClassChange($event, claIdx)',
                :indeterminate="cla.indeterminate",
                :disabled='!cla.classMemberList.length || cla.disable',
                style='margin-right:4px'
              )
              span {{ cla.name }}
        .dic-right
          template(v-if='classList.length')
            .dicr-item(
              v-for='stu in classList[activeClassIdx].classMemberList',
              :key='stu.userId'
            )
              a-checkbox(v-model:checked='stu.checked',@change="handleStuChange")
                span.dicr-text {{ stu.name }}
</template>
<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref, watch } from 'vue';
import { cloneDeep } from 'lodash';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import {
  Tag,
  Input,
  Form,
  Switch,
  Button,
  Checkbox,
  Row,
  Col,
  Modal,
  DatePicker,
  InputNumber,
  message,
} from 'ant-design-vue';
import moment, { Moment } from 'moment';
import { useForm } from '@ant-design-vue/use';
import { Class, IClass, IDistributeForm } from './lib/interface';

export default defineComponent({
  components: {
    aTag: Tag,
    aInput: Input,
    aFormItem: Form.Item,
    aInputNumber: InputNumber,
    aForm: Form,
    aSwitch: Switch,
    aCheckbox: Checkbox,
    aDatePicker: DatePicker,
    ExclamationCircleOutlined,
    Row,
    Col,
    aModal: Modal,
    aButton: Button,
  },
  props: {
    /**
     * 弹窗是否显示
     */
    visible: {
      type: Boolean,
      default: false,
    },
    /**
     * 案例id
     */
    caseId: {
      type: String,
      default: '',
    },
    /**
     * 案例名
     */
    caseName: {
      type: String,
      default: '',
    },
    /**
     * 班级列表
     */
    classSource: {
      type: Array as PropType<IClass[]>,
      default: () => [new Class()],
    },
    saving: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const classList = ref((cloneDeep(props.classSource) as unknown) as IClass[]);
    const checkedClass = computed(() => {
      try {
        return classList.value.filter((cla) => cla.checked);
      } catch (e) {
        return [];
      }
    });
    const activeClassIdx = ref(0);
    const formState = reactive({
      caseId: 'uuid',
      caseName: '自定义案例名称',
      endTime: null,
      experimentClassReqs: [
        {
          classId: 'string',
          memberReqList: [
            {
              userId: 'string',
            },
          ],
          teacherId: 'string',
        },
      ],
      runStageTotalTime: 20,
      startTime: null,
      viewAnswer: false,
      viewReport: false,
    } as IDistributeForm);
    const formRule = {
      startTime: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
      endTime: [{ required: true, message: '请选择结束日期', trigger: 'change' }],
    };
    const { resetFields } = useForm(formState, formRule);
    const startDisabled = (current: Moment) =>
      (current && current < moment().subtract(1, 'days')) ||
      (current && current > moment(formState.endTime));

    const endDisabled = (current: Moment) =>
      (current && current < moment().subtract(1, 'days')) ||
      (current && current < moment(formState.startTime));
    const handleTagClose = (classId: string) => {
      const cla = classList.value.find((cl) => cl.id === classId);
      if (cla) {
        cla.checked = false;
        cla.classMemberList.forEach((stu) => {
          stu.checked = false;
        });
      }
    };

    const handleClassClick = (cla: IClass, claIdx: number) => {
      activeClassIdx.value = claIdx;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClassChange = (e: any, claIdx: number) => {
      classList.value[claIdx].classMemberList.forEach((stu) => {
        stu.checked = e.target.checked;
      });
      classList.value[claIdx].indeterminate = false;
    };
    const handleStuChange = () => {
      const len = classList.value[activeClassIdx.value].classMemberList?.length as number;
      const checkedLen = classList.value[activeClassIdx.value].classMemberList?.filter(
        (d) => d.checked,
      ).length;
      if (checkedLen === 0) {
        classList.value[activeClassIdx.value].checked = false;
        classList.value[activeClassIdx.value].indeterminate = false;
      }
      if (checkedLen > 0) {
        classList.value[activeClassIdx.value].checked = true;
        if (checkedLen < len) {
          classList.value[activeClassIdx.value].indeterminate = true;
        } else {
          classList.value[activeClassIdx.value].indeterminate = false;
        }
      }
    };
    // eslint-disable-next-line consistent-return
    const handleConfirm = async () => {
      const start = moment(formState.startTime);
      const end = moment(formState.endTime);
      if (!formState.startTime) return message.error('请选择开始时间');
      if (!formState.endTime) return message.error('请选择结束时间');
      if (start >= end || end.valueOf() - start.valueOf() < 1000 * 60 * 1) {
        return message.error('请重新选择结束时间！');
      }
      const data = {} as IDistributeForm;
      Object.assign(data, formState);
      data.startTime = moment(data.startTime).format('YYYY-MM-DD HH:mm:ss');
      data.endTime = moment(data.endTime).format('YYYY-MM-DD HH:mm:ss');
      data.caseId = props.caseId;
      data.caseName = props.caseName;
      data.experimentClassReqs = classList.value
        .filter((cla) => cla.classMemberList.some((stu) => stu.checked))
        .map((cla) => ({
          classId: cla.id,
          teacherId: cla.teacherCode,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          memberReqList: cla.classMemberList
            .filter((user) => user.checked)
            .map((stu) => ({
              userId: stu.userId,
            })),
        }));
      data.experimentClassReqs = data.experimentClassReqs.filter((cla) => cla.memberReqList.length);
      emit('ok', data);
    };
    const handleCancel = () => {
      emit('cancel');
    };
    watch(
      () => props.visible,
      (visible: boolean) => {
        if (!visible) {
          resetFields();
          activeClassIdx.value = 0;
          formState.runStageTotalTime = 20;
          formState.startTime = null;
          formState.endTime = null;
          formState.viewAnswer = false;
          formState.viewReport = false;
          classList.value = (cloneDeep(props.classSource) as unknown) as IClass[];
        }
      },
    );
    return {
      startDisabled,
      endDisabled,
      formState,
      classList,
      activeClassIdx,
      handleTagClose,
      handleClassClick,
      handleClassChange,
      handleStuChange,
      checkedClass,
      handleConfirm,
      handleCancel,
    };
  },
});
</script>
<style lang="stylus" scoped>
.dm-wrap
  .dic-main
    display grid
    grid-template-columns 160px 1fr
    height 224px
    border 1px solid #dddddd
    border-radius 4px
  .dic-left
    padding 4px 8px
    height 222px
    overflow-y auto
    border-right 1px solid #dddddd
  .dicl-item
    cursor pointer
    width 130px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    height 36px
    font-size 14px
    font-family MicrosoftYaHeiUI
    color rgba(42, 46, 54, 0.75)
    line-height 36px
    user-select none
    &:hover
      background #f5f5f5
  .dicl-item.active
    color #2d8cf0
  .dic-right
    height 222px
    overflow-y auto
    padding 4px 16px
    display block
  .dicr-item
    display inline-block
    cursor pointer
    height 36px
    width calc((100% / 3))
    line-height 36px
    padding-right 8px
  .dicr-text
    user-select none
    vertical-align top
    display inline-block
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    margin-left 0px
    width 70px
</style>
