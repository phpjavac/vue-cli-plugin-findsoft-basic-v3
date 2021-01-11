<template lang="pug">
.main.flex.flex-column.align-items-center.justify-center
  h1 当前角色无权限进入该页面
  a-button(type='primary' @click='goBack') 返回首页
</template>
<script lang="ts">
import { Button } from 'ant-design-vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    aButton: Button,
  },
  props: {},
  setup() {
    const router = useRouter();
    const goBack = () => {
      const { role, code } = sessionStorage;
      if (!role || !code) {
        router.push('/');
      } else if (role === 'student') {
        router.push('/Student/home');
      } else if (['admin', 'teacher'].includes(role)) {
        router.push('/Teacher/userlist');
      } else {
        router.push('/');
      }
    };
    return {
      goBack,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  height 100vh
  h1
    margin-top 200px
</style>
