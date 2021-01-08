<template>
  <router-view/>
</template>
<script lang="ts">
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    store.dispatch('system/getSoftConfig');
    if (sessionStorage.getItem('code')) {
      store.dispatch('user/getByCode');
    }
  },
};

</script>
<style lang="stylus">

</style>
