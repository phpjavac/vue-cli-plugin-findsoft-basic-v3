<template lang="pug">
.main
  .search(:style='{width:props.searchWidth}')
    a-input-search(placeholder='搜索关键字' @search="onSearch")
</template>

<script lang="ts">
import { Input } from 'ant-design-vue';
import { defineComponent, SetupContext } from 'vue';

export default defineComponent({
  components: {
    aInputSearch: Input.Search,
  },
  props: {
    searchWidth: {
      type: String,
      default: () => '240px',
    },
  },
  setup(props, context: SetupContext) {
    const onSearch = (value: string) => {
      context.emit('get-search', value);
    };
    return {
      onSearch,
      props,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .search
    display block
</style>
