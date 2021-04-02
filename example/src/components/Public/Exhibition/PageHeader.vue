<template lang="pug">
.page-header.flex.flex-row.justify-between.align-items-center
  .title {{title}}
  a-button.goback(v-if='back' @click='goBack' type='primary') 返回
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { Button } from 'ant-design-vue';
// import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    aButton: Button,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    back: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    // const router = useRouter();
    const store = useStore();
    const goBack = () => {
      // context.emit('change-component', '');
      store.commit('exhibition/upCurrent', 'list');
    };
    return {
      goBack,
    };
  },
});
</script>

<style lang="stylus" scoped>
.page-header
  .title
    margin-top 8px
    margin-bottom 20px
    color rgba(0,0,0,.85)
    font-weight 500
    font-size 30px
    line-height 38px
</style>
