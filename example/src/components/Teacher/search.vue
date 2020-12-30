<template lang="pug">
.main.flex.flex-row.justify-between
  .action
    slot(name='btn-action')
  .search
    a-input-search(
      v-model:value="searchValue"
      placeholder='搜索关键字'
      :style='{width:props.searchWidth}'
      @search="onSearch"
    )
</template>

<script lang="ts">
import { Input } from 'ant-design-vue';
import { defineComponent, ref, SetupContext } from 'vue';

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
    const searchValue = ref('');
    const onSearch = () => {
      context.emit('get-search', searchValue.value);
    };
    return {
      searchValue,
      onSearch,
      props,
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
