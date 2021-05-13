<template lang="pug">
.main
  breadcrumb(:breadcrumb="breadcrumb")
  .div 这是列表页，主要用来显示面包屑
  .div.pointer(@click='goInfo') 点击进入详情页
  button(@click="showQuestion=true") 显示问题弹窗
  question(:visible="showQuestion",@ok="handleQuestionOk",@cancel="showQuestion=false")
  div {{questionData}}
</template>

<script lang="ts">
import { Question, QuestionI } from '@/components/Public/Question/js/interface';
import { getUniqueId } from '@/lib';
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button } from 'ant-design-vue';

export default defineComponent({
  components: {
    breadcrumb: defineAsyncComponent(() => import('@/components/Breadcrumbs.vue')),
    question: defineAsyncComponent(() => import('@/components/Public/Question/Index.vue')),
    aButton: Button,
  },
  props: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const goInfo = () => {
      router.push('/Teacher/experimentinfo');
    };
    console.log(getUniqueId([{}, {}]));

    const showQuestion = ref(false);

    const questionData = new Question();

    const handleQuestionOk = (data: QuestionI) => {
      Object.assign(questionData, data);
      showQuestion.value = false;
    };

    return {
      breadcrumb: { breadcrumbName: '一级页面', path: route.path },
      showQuestion,
      questionData,
      handleQuestionOk,
      goInfo,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .div
    margin 50px auto
</style>
