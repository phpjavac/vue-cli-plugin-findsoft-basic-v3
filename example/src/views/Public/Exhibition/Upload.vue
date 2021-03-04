<template lang="pug">
.main
  PageHeader(title='上传组件')
  a-modal.modal1(width='860' v-model:visible='modal1')
    .vue-cropper
      vue-cropper(ref="cropper",:src="testSrc",:aspectRatio="16/9")
  a-form().content
    a-form-item(label="案例封面")
      .img-cover
        .left-img(v-if="!form.expPath")
          img(src="../../../assets/img/exhibition/noimg.png")
        img(v-else,:src="form.expPath").left-img
        .r-text
          .text 支持格式：
            span  jpg、jpeg、png
            br
            |  最佳尺寸：
            span  210*118
            br
            |  图片大小：
            span  2M以内
          a-upload(accept=".jpg, .jpeg, .png",:beforeUpload="beforeUpload",:showUploadList="false")
            a-button(type="dashed")
              a-icon.icon(type="icontuichu11")
              | 上传
</template>

<script lang="ts">
import {
  Form, Button, Upload, message, Modal,
} from 'ant-design-vue';
import {
  defineAsyncComponent, defineComponent, reactive, ref,
} from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    aForm: Form,
    aFormItem: Form.Item,
    aButton: Button,
    aUpload: Upload,
    aIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
    VueCropper,
    aModal: Modal,
  },
  props: {},
  setup() {
    const form = reactive({
      expPath: undefined,
    });
    const testSrc = ref('');
    const modal1 = ref(false);
    // eslint-disable-next-line consistent-return
    const beforeUpload = (file: File) => {
      const arr = ['image/png', 'image/jpeg'];
      if (file.size > 2048000) {
        return message.error('图片大小需在2M内');
      }
      if (!arr.includes(file.type)) {
        return message.error('请上传正确格式图片');
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event, 'eeeeeeee');
          form.expPath = event.currentTarget.result;
          testSrc.value = event.currentTarget.result;
          modal1.value = true;
          // this.imgSrc = (<FileReader>event.target).result as string;
          // this.modalVisible = true;
          // this.$nextTick(() => {
          //   (this.$refs.cropper as any).replace((event as any).target.result);
          // });
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      form,
      testSrc,
      modal1,
      beforeUpload,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .content
    background #fff
    padding 20px
    .modal1
      .vue-cropper
        width 400px
        height 400px
    .img-cover
      display flex
      .left-img
        width 210px
        height 118px
        background rgba(244, 244, 244, 1)
        border-radius 4px
        text-align center
        line-height 118px
        img
          width 36px
          height 36px
      .r-text
        width 200px
        margin-left 16px
        .text
          font-size 12px
          font-family MicrosoftYaHeiUI
          color rgba(175, 177, 183, 1)
          line-height 26px
          span
            color rgba(68, 133, 240, 1)
      .icon
        transform rotate(-90deg)
</style>
