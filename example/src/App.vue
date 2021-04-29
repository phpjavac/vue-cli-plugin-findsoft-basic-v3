<template>
  <a-config-provider :locale="zh">
    <router-view/>
  </a-config-provider>
</template>
<script lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import { useStore } from 'vuex';
import zh from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');

export default {
  components: {
    aConfigProvider: ConfigProvider,
  },
  setup() {
    const store = useStore();
    store.dispatch('system/getSoftConfig');
    if (sessionStorage.getItem('code')) {
      store.dispatch('user/getByCode');
    }
    return {
      zh,
    };
  },
};

</script>
<style lang="stylus">

</style>
