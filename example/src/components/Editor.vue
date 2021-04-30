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

      let htmlCache = '';
      editor.config.onchange = (html: string) => {
        htmlCache = html;
        emit('update:modelValue', html);
      };

      // TODO: 添加配置属性

      // 当 prop 变化时自动更新富文本内容
      watch(() => props.modelValue, (v: string) => {
        if (props.modelValue !== htmlCache) {
          // 直接赋值会导致光标位置出错，只有当父组件主动改变props时才更新富文本内容，子组件触发的更新不会导致重新赋值
          editor.txt.html(v);
        }
      }, { immediate: false });
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
