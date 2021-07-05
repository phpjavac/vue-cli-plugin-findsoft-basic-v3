<template lang="pug">
.icon-card.flex.flex-columns.align-items-center.pointer
  b-icon.icon(:type='type', :color='color',)
  .text {{text}}
  .icon-str {{type}}
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
components: {
    bIcon: defineAsyncComponent(()=>import('@/components/BaseIcon.vue'))},
props: {
  type:{
    type:String,
    default:'iconwechaticon19'
  },
  text:{
    type:String,
    default:'icon文字'
  },
  color:{
    type:String,
    default:'rgba(0,0,0,0.65)'
  }
},
setup() {
return {
};
},
});
</script>

<style lang="stylus" scoped>
.icon-card
  text-align center
  font-size 12px
  border 1px solid rgba(#ccc, 0.65)
  border-radius 10px 
  box-shadow 5px 5px 5px #ccc
  background #ffffff
  &:hover
    box-shadow 5px 5px 5px rgba($primary-color, 0.25)
  .icon
    font-size 24px
  .icon,.text,.icon-str
    margin-top 20px
  .text
    font-size 16px
  .icon-str
    font-size 14px
</style>