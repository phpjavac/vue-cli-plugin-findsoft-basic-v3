<template lang="pug">
a-modal.main(
  v-model:visible='props.visible'
  @cancel='onCancel'
)
  .div {{props.isEdit?'修改学生':'新增学生'}}
</template>

<script lang="ts">
import { Modal } from 'ant-design-vue';
import { defineComponent, SetupContext } from 'vue';

export default defineComponent({
  components: {
    aModal: Modal,
  },
  props: {
    isEdit: {
      type: Boolean,
      defalut: () => false,
    },
    visible: {
      type: Boolean,
      defalut: () => false,
    },
  },
  setup(props, context: SetupContext) {
    const onSubmit = () => {
      context.emit('on-submit');
    };
    const onCancel = () => {
      context.emit('on-cancel');
    };
    return {
      props,
      onSubmit,
      onCancel,
    };
  },
});
</script>

<style lang="stylus" scoped>

</style>
