<template lang="pug">
.dmv-wrap
  PageHeader(title='分配弹窗')
  a-button(type="primary",@click="showModal=true") 显示弹窗
  DistributeModal(:visible="showModal",:calse-id="caseData.caseId",
  :case-name="caseData.caseName",:classSource="classSource",:saving="saving",
  @cancel="handleCancelClick",@ok="handleOkClick")
  div {{formData}}
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent, reactive, ref } from 'vue';
import DistributeModal from '@/components/Public/DistributeModal/Index.vue';
import { Class, IDistributeForm } from '@/components/Public/DistributeModal/lib/interface';
import { Button } from 'ant-design-vue';

export default defineComponent({
  name: 'DistributeModalView',
  components: {
    aButton: Button,
    DistributeModal,
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
  },
  setup() {
    const showModal = ref(false);
    const caseData = reactive({
      caseId: 'caseId',
      caseName: 'caseName',
    });
    const classSource = ref([
      new Class({
        id: '',
        name: '班级1',
        remarks: '',
        checked: false,
        stuNum: 0,
        teacherCode: '',
        indeterminate: false,
        classMemberList: [
          {
            name: '学生1',
            userId: 's1',
            checked: false,
          },
          {
            name: '学生2',
            userId: 's2',
            checked: false,
          },
        ],
      }),
    ]);
    const handleCancelClick = () => {
      showModal.value = false;
    };
    const saving = ref(false);
    const formData = reactive({});
    const handleOkClick = (data: IDistributeForm) => {
      Object.assign(formData, data);
      console.log(data);
      saving.value = true;
      setTimeout(() => {
        saving.value = false;
        showModal.value = false;
      }, 1000);
    };

    return {
      formData,
      showModal,
      caseData,
      classSource,
      saving,
      handleCancelClick,
      handleOkClick,
    };
  },
});
</script>
