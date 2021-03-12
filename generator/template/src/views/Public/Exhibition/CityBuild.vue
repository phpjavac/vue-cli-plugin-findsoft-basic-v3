<template lang="pug">
.main
  PageHeader(title='城市构建')
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
  },
  props: {},
  setup() {
    return {
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
