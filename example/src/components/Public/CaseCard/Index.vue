<template lang="pug">
.cc-list-item
  .cc-list-item-top(:style="{background: `left 0%/100% 100% no-repeat url(${transformSpace(cardData.path)})`}")
  .cc-list-item-bottom
    div.cc-list-item-bottom-title-div
      a-tooltip.cc-list-item-bottom-title(name="title",:title="cardData.title") {{ cardData.title }}
    div(slot="types")
      .cc-list-item-bottom-type-tag.cc-gray-text.dib.mr8(v-for="type in cardData.types",:key="type") {{type}}
    slot(name="status")
      div.cc-list-item-bottom-status
        span.dib.cc-dot.mr8(v-if="!cover",:class="[cardData.publish ? 'cc-publish':'']") {{cardData.publish ? '已发布':'未发布'}}
        span.dib.cc-gray-text 创建者：{{cardData.creator}}
        div(style="float:right").rel.dib
          slot(name="option",v-if="!cover")
            EllipsisOutlined.dib(type="ellipsis",@click="handleOptionClick")
  .cc-list-item-cover(v-if="cover")
    slot(name="cover")
      a-button(@click="handleDistributeClick") 分配实训
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { transformSpace } from '@/lib/transformUrl';
import { Button, Tooltip } from 'ant-design-vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import { CardData } from './lib/interface';

export default defineComponent({
  name: 'CaseCard',
  components: {
    aTooltip: Tooltip,
    aButton: Button,
    EllipsisOutlined,
  },
  props: {
    cover: {
      type: Boolean,
      default: false,
    },
    cardData: {
      type: CardData,
      default: () => new CardData({}),
    },
  },
  emits: ['distribute', 'option'],
  setup(_, { emit }) {
    const handleDistributeClick = () => {
      emit('distribute');
    };
    const handleOptionClick = () => {
      emit('option');
    };
    return {
      transformSpace,
      handleDistributeClick,
      handleOptionClick,
    };
  },
});
</script>
<style lang="stylus" scoped>
.rel
  position relative
.mr8
  margin-right 8px
.dib
  display inline-block
.cc-dot
  position relative
  padding-left 12px
  font-size:12px;
  font-family:MicrosoftYaHeiUI;
  color:rgba(42,46,54,0.8);
.cc-dot:before
  content ''
  left 0
  top 6px
  position absolute
  width 8px
  height 8px
  border-radius 4px
  background rgba(207,207,207,1);
.cc-publish:before
  background rgba(120,203,29,1);
.cc-gray-text
  font-size:12px;
  font-family:MicrosoftYaHeiUI;
  color:rgba(153,153,153,1);
  line-height:15px;
.cc-list-item
  overflow hidden
  vertical-align top
  position relative
  display inline-block
  border-radius 4px
  width 222px
  // height 231px
  background:rgba(255,255,255,1);
.cc-list-item-top
  height 118px
.cc-list-item-bottom
  padding 16px
  padding-bottom 0
.cc-list-item-bottom-title-div
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
.cc-list-item-bottom-title
  width:190px;
  height:21px;
  font-size:14px;
  font-family:MicrosoftYaHeiUI;
  color:rgba(42,46,54,1);
  line-height:21px;
  margin-bottom 12px
.cc-list-item-bottom-type-tag
  height:12px;
  font-size 12px
  display inline-block
  margin-bottom 12px
  line-height 12px
.cc-list-item-bottom-status
  border-top 1px solid #E8EEF5
  padding 8px 0
.cc-list-item:hover
  transition all .3s
  .cc-list-item-cover
    display block
    display flex
    justify-content center
    align-items center
.cc-list-item-cover
  display none
  position absolute
  left  0
  right 0
  top 0
  bottom 0
  background rgba(42,46,54,0.5);
  opacity 0
  text-align center
  transition all .3s
  &:hover
    opacity 1
    transition all .3s
</style>
