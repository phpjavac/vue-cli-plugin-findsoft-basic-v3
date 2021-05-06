<template lang="pug">
.main
  breadcrumb(:breadcrumb="breadcrumb")
  .div 这是列表页，主要用来显示面包屑
  .div.pointer(@click='goInfo') 点击进入详情页
  button(@click="showQuestion=true") 显示问题弹窗
  question(:visible="showQuestion",@ok="handleQuestionOk",@cancel="showQuestion=false")
  div {{questionData}}
  a-button(@click='initWs(1)') 创建ws
  a-button(@click='sendData') 点击发送ws信息xxxx
  a-button(@click='initWs(2)') 创建与第一个ws相同的连接
  a-button(@click='initWs(3)') 创建不同的ws连接
  a-button(@click='initWs(33)') 关闭第二个ws
</template>

<script lang="ts">
import { Question, QuestionI } from '@/components/Public/Question/js/interface';
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button, message } from 'ant-design-vue';
import WsHeartBeat, { FWsData } from '@findsoft/ws-heartbeat-ts';
// import WsHeartBeat, { FWsData } from 'ws-heartbeat-ts';

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

    const showQuestion = ref(false);

    const questionData = new Question();

    const handleQuestionOk = (data: QuestionI) => {
      Object.assign(questionData, data);
      showQuestion.value = false;
    };

    const wsUrls = [
      'ws://192.168.1.147:8080/clap/webSocketStatus?userId=pl3&classId=83faae79-fc0a-4bf6-9da2-4c4de6e1eff9&type=0',
      'ws://192.168.1.147:8080/clap/webSocketStatus?userId=ss1&classId=5c5fe20a-61c7-4c14-b044-3f114b12a00a&type=0',
    ];
    /** ts */
    let wsInstance: WsHeartBeat;
    let wsInstance2: WsHeartBeat;
    const sendData = () => {
      const bool = Math.random() > 0.5;
      const msg = {
        code: `${!!bool}`,
        type: 'type',
        message: 'this is a message',
        data: [1, 2, 3],
      };
      wsInstance.sendData(msg);
    };
    const init = () => {
      wsInstance.onopen = () => {
        console.log('open');
      };
      wsInstance.onmessage = (data: FWsData) => {
        console.log(data, 'this is ws data');
      };
      wsInstance.onerror = () => {
        console.log('onerror');
      };
      wsInstance.onreconnect = () => {
        console.log('onreconnect');
      };
    };
    const init2 = () => {
      wsInstance2.onopen = () => {
        console.log('open wsInstance2');
      };
      wsInstance2.onmessage = (data: FWsData) => {
        console.log(data, 'this is ws data wsInstance2');
      };
      wsInstance2.onerror = () => {
        console.log('onerror wsInstance2');
      };
      wsInstance2.onreconnect = () => {
        console.log('onreconnect wsInstance2');
      };
    };
    const log = (str: string) => {
      message.success(str);
      console.log(str);
    };
    const initWs = (code: number) => {
      if (code === 1) {
        wsInstance = WsHeartBeat.getInstance({ url: wsUrls[0] });
        init();
        log(`创建了一个ws，地址为${wsUrls[0]}`);
      } else if (code === 2) {
        const two = WsHeartBeat.getInstance({ url: wsUrls[0] });
        log(`创建了一个ws，地址为${wsUrls[0]},两个实例是否相同 ${wsInstance === two}`);
      } else if (code === 3) {
        wsInstance2 = WsHeartBeat.getInstance({ url: wsUrls[1], pingMsg: 'break', pingTimeout: 1000 });
        init2();
        log(`创建了一个ws，地址为${wsUrls[1]}`);
        console.log(wsInstance2, 'WsHeartBeat');
      } else if (code === 33) {
        wsInstance2.close();
        console.log(wsInstance2, 'WsHeartBeat');
      }
    };

    return {
      breadcrumb: { breadcrumbName: '一级页面', path: route.path },
      showQuestion,
      questionData,
      handleQuestionOk,
      goInfo,
      initWs,
      sendData,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .div
    margin 50px auto
</style>
