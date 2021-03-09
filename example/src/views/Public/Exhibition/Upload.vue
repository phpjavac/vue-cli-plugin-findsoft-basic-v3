<template lang="pug">
.main
  PageHeader(title='上传组件')
  a-form().content
    a-form-item(label="上传图片")
      upload-img(v-bind='uploadOption')
        template(#prefix)
          a-icon.icon(type="icontuichu11")
</template>

<script lang="ts">
import {
  Form,
} from 'ant-design-vue';
import {
  defineAsyncComponent, defineComponent,
} from 'vue';

export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    UploadImg: defineAsyncComponent(() => import('@/components/UploadImg.vue')),
    aForm: Form,
    aFormItem: Form.Item,
    aIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
  },
  props: {},
  setup() {
    const uploadOption = {
      // fileSize: 1,
      oldImgSrc: 'http://dummyimage.com/64x64',
      aspectRatio: 1,
      disabled: true,
    };

    return {
      uploadOption,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .content
    background #fff
    padding 20px
    .icon
      transform rotate(-90deg)
</style>
