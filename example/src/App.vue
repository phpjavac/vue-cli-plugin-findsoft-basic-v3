<template>
  <router-view/>
</template>
<script lang="ts">
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    store.dispatch('system/getSoftConfig');
  },
};

</script>
<style lang="stylus">

</style>
