<template lang="pug">
div(:id="uid")
</template>
<script lang="ts">
import {
  defineComponent, nextTick, onMounted, reactive, watch,
} from 'vue';
import E from 'wangeditor';
import { uniqueId } from 'lodash';

export default defineComponent({
  name: 'WangEditor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['mounted', 'update:modelValue'],
  setup(props, { emit }) {
    const uid = uniqueId('h-editor');
    let editor = reactive({} as E);
    onMounted(async () => {
      await nextTick();
      editor = new E(`#${uid}`);
      // editor.txt.html(props.value);
      editor.create();
      emit('mounted', editor);

      if (typeof props.modelValue !== 'string') {
        editor.txt.html('');
      } else {
        editor.txt.html(props.modelValue);
      }

      editor.config.onchange = (html: string) => {
        emit('update:modelValue', html);
      };

      watch(() => props.modelValue, () => {
        editor.txt.html(props.modelValue);
      });
    });
    return {
      uid,
      editor,
    };
  },
});
</script>
<style lang="stylus" scoped>
</style>
