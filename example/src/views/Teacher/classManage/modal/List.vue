<template lang="pug">
a-modal.main(
  v-model:visible='props.visible'
  @cancel='onCancel'
)
  .div 学生列表
</template>

<script lang="ts">
import { Modal } from 'ant-design-vue';
import { defineComponent, SetupContext } from 'vue';

export default defineComponent({
  components: {
    aModal: Modal,
  },
  props: {
    visible: {
      type: Boolean,
      defalut: () => false,
    },
  },
  setup(props, context: SetupContext) {
    const onCancel = () => {
      context.emit('on-cancel');
    };
    return {
      props,
      onCancel,
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
