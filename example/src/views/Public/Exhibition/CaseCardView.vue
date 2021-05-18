<template lang="pug">
.ccv-wrap
  PageHeader(title='案例卡片')
  template(v-for="(card,cardIndex) in dataList")
    CaseCard(:cover="card.showCover",:card-data="card.cardData",
    @distribute="handleDistClick",@option="handleOptionClick",style="margin-right:24px")
      //- 遮罩插槽
      template(#cover,v-if="cardIndex===1")
        div(style="color:white") test cover slot
      //- 右下角菜单插槽
      template(#option,v-if="cardIndex===2")
        ArrowRightOutlined()
</template>
<script lang="ts">
import { defineAsyncComponent, defineComponent, reactive, ref } from 'vue';
import CaseCard from '@/components/Public/CaseCard/Index.vue';
import { CardData } from '@/components/Public/CaseCard/lib/interface';
import { message } from 'ant-design-vue';
import { ArrowRightOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'CaseCardView',
  components: {
    CaseCard,
    ArrowRightOutlined,
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
  },
  setup() {
    const showCover = ref(false);
    const cardData = reactive(
      new CardData({
        title: '很长很长很长很长很长很长很长很长的案例名',
        path: 'https://s3.jpg.cm/2021/05/18/OqL58.jpg',
        types: ['类型1', '类型2'],
        creator: '管理员',
        publish: true,
      }),
    );
    const dataList = ref([
      {
        showCover: false,
        cardData: new CardData({
          title: '很长很长很长很长很长很长很长很长的案例名',
          path: 'https://s3.jpg.cm/2021/05/18/OqL58.jpg',
          types: ['类型1', '类型2'],
          creator: '管理员',
          publish: true,
        }),
      },
      {
        showCover: true,
        cardData: new CardData({
          title: '很长很长很长很长很长很长很长很长的案例名',
          path: 'https://s3.jpg.cm/2021/05/18/OqL58.jpg',
          types: ['类型1', '类型2'],
          creator: '管理员',
          publish: true,
        }),
      },
      {
        showCover: false,
        cardData: new CardData({
          title: '很长很长很长很长很长很长很长很长的案例名',
          path: 'https://s3.jpg.cm/2021/05/18/OqL58.jpg',
          types: ['类型1', '类型2'],
          creator: '管理员',
          publish: false,
        }),
      },
      {
        showCover: true,
        cardData: new CardData({
          title: '很长很长很长很长很长很长很长很长的案例名',
          path: 'https://s3.jpg.cm/2021/05/18/OqL58.jpg',
          types: ['类型1', '类型2'],
          creator: '管理员',
          publish: true,
        }),
      },
    ]);
    const handleDistClick = () => {
      message.success('点击了分配按钮');
    };
    const handleOptionClick = () => {
      message.success('点击了菜单按钮');
    };
    return {
      showCover,
      cardData,
      handleDistClick,
      handleOptionClick,
      dataList,
    };
  },
});
</script>
<style lang="stylus" scoped>
.ccv-wrap
  font-size 14px
</style>
