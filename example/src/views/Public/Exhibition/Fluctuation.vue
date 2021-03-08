<template lang="pug">
.main
  PageHeader(title='数值波动')
  .content.flex.flex-row.justify-start(@click='numChange')
    a-fluctuation(:value='nums' :seperator='false' unit='单位' :interval='500')
      template(#prefix)
        a-icon(type='icontuichu11')
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from 'vue';
import Fluctuation from '@/components/Fluctuation.vue';

export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    aFluctuation: Fluctuation,
    aIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
  },
  props: {},
  setup() {
    const nums = ref(0);
    const numChange = () => {
      nums.value += 100;
    };
    return {
      nums,
      numChange,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .content
    padding 50px
</style>
