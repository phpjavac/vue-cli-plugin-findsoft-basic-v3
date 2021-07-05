<template lang="pug">
div(:id='uid')
</template>
<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  watch,
  onBeforeUnmount,
  PropType,
} from 'vue';
import E from 'wangeditor';
import { uniqueId } from 'lodash';
import { ConfigType } from 'wangeditor/dist/config/index.d';

function isFunction(functionToCheck: unknown) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}

export default defineComponent({
  name: 'WangEditor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    config: {
      type: Object as PropType<ConfigType>,
      default: () => ({}),
    },
  },
  emits: ['mounted', 'update:modelValue'],
  setup(props, { emit }) {
    const uid = uniqueId('h-editor');
    let editor = reactive({} as E);
    onMounted(async () => {
      await nextTick();
      editor = new E(`#${uid}`);

      editor.config.excludeMenus = ['todo', 'video', 'code'];
      /**
       * 配置属性
       */
      let htmlCache = '';
      Object.assign(editor.config, props.config);
      editor.config.onchange = (html: string) => {
        htmlCache = html;
        emit('update:modelValue', html); // v-model:value 绑定
        // 如果配置了 onchange 回调函数，就调用该函数

        if (isFunction(props.config)) {
          (props.config.onchange as Function)(html);
        }
      };

      /**
       * 初始化编辑器
       */
      editor.create();
      emit('mounted', editor);

      if (typeof props.modelValue !== 'string') {
        editor.txt.html('');
      } else {
        editor.txt.html(props.modelValue);
      }

      // 当 prop 变化时自动更新富文本内容
      watch(
        () => props.modelValue,
        (v: string) => {
          if (props.modelValue !== htmlCache) {
            // 直接赋值会导致光标位置出错，只有当父组件主动改变props时才更新富文本内容，子组件触发的更新不会导致重新赋值
            editor.txt.html(v);
          }
        },
        { immediate: false },
      );
    });
    // 销毁编辑器
    onBeforeUnmount(() => {
      if (editor) editor.destroy();
    });
    return {
      uid,
      editor,
    };
  },
});
</script>
<style lang="stylus" scoped></style>
