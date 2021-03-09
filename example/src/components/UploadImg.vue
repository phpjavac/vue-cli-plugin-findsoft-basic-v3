<template lang="pug">
.img-cover
  a-modal(
    v-model:visible="modalVisible",
    :title="title",
    cancelText="取消",
    cancelType="link",
    okText="确定",
    @onCancel="onCancel",
    :keyboard="false",
    @ok="onOk",
    :maskClosable="false"
  )
    vue-cropper(ref="cropper", id='vue-cropper' :src="choseImg", :aspectRatio="aspectRatio")
  //- 1、如果有传过来的旧图，显示旧图
  //- 2、如果没有，显示无图
  //- 3、裁切时，也是显示旧图
  //- 4、裁切后，显示裁切之后的图
  //- 5、上传的图，不需要显示。只是用来控制cropper的显示内容
  .left-img(v-if="!oldImgSrc && !afterImg " :style='{width: CWidth, height: CHeight}')
    img(src="../assets/img/exhibition/noimg.png")
  img.left-img(v-else, :src="afterImg || oldImgSrc" :style='{width: CWidth, height: CHeight}')
  .r-text
    .text 支持格式：
      span {{importType.join('、')}}
      br
      |
      | 最佳尺寸：
      span {{ sizeText }}
      br
      |
      | 图片大小：
      span {{fileSize}}M以内
    a-upload(
      accept=".jpg, .jpeg, .png",
      :showUploadList="false",
      :disabled="disabled",
      :beforeUpload="beforeUpload"
    )
      a-button(type="dashed")
        //- a-icon(type="icontuichu11")
        slot(name='prefix')
        | 上传
</template>

<script lang="ts">
import {
  Form, Button, Upload, message, Modal,
} from 'ant-design-vue';
import {
  computed,
  defineAsyncComponent, defineComponent, nextTick, ref, SetupContext,
} from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
/* eslint-disable @typescript-eslint/no-explicit-any */

export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    aForm: Form,
    aFormItem: Form.Item,
    aButton: Button,
    aUpload: Upload,
    // aIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
    VueCropper,
    aModal: Modal,
  },
  props: {
    /** 是否需要禁用 */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** 裁剪框title */
    title: {
      type: String,
      default: '图片裁剪',
    },
    /** 之前的图片 */
    oldImgSrc: {
      type: String,
      default: '',
    },
    /** 裁剪比例 */
    aspectRatio: {
      type: Number,
      default: 16 / 9,
    },
    /** 组件图片高度 —— 为了让图片按正常比例显示，但不应该把api开放出来 */
    // componentsHeight: {
    //   type: Number,
    //   default: 118,
    // },
    /** 推荐尺寸 */
    sizeText: {
      type: String,
      default: '210*118',
    },
    /** 限制大小 M */
    fileSize: {
      type: Number,
      default: 2,
    },
    /** 输出格式 jpg、png */
    exportType: {
      type: String,
      default: 'png',
    },
    /** 输入格式 */
    importType: {
      type: Array,
      default: () => ['jpg', 'jpeg', 'png'],
    },
  },
  setup(props, context: SetupContext) {
    const getExportType = (type: string) => {
      if (type && type === 'jpg') return 'image/jpg';
      return 'image/png';
    };

    const modalVisible = ref(false); /** 模态框 */
    const choseImg = ref(''); /** 裁剪框里的图片，也就是当前选择的图片 */
    const afterImg = ref(''); /** 用来存储裁切后的图片 */
    const CHeight = 118; // 组件高度
    const cropper = ref(null); /** 组件refs */

    /** 根据比例获得宽度 */
    const CWidth = computed(() => `${props.aspectRatio * CHeight}px`);
    // eslint-disable-next-line consistent-return
    const beforeUpload = (file: File) => {
      // const arr = ['image/png', 'image/jpeg'];
      const arr = props.importType.map((t) => `image/${t}`);
      if (file.size > props.fileSize * 1024 * 1000) {
        return message.error(`图片大小需在${props.fileSize}M内`);
      }
      if (!arr.includes(file.type)) {
        return message.error(`请上传正确格式图片，支持的图片格式为${props.importType}`);
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          choseImg.value = event.currentTarget.result;

          modalVisible.value = true;
          nextTick(() => {
            /** 这句话用来更新弹框里的图片 */
            (cropper.value as any).replace(event.currentTarget.result);
          });
        };
        reader.readAsDataURL(file);
      }
    };
    const onOk = () => {
      afterImg.value = (cropper.value as any).getCroppedCanvas().toDataURL();

      (cropper.value as any)
        .getCroppedCanvas()
        .toBlob((blob: Blob) => {
          console.log(blob);
          const files = new window.File([blob], '案例封面.png', {
            type: getExportType(props.exportType),
          });
          context.emit('upload', files);
          modalVisible.value = false;
        });
    };
    const onCancel = () => {
      choseImg.value = '';
    };

    return {
      beforeUpload,

      CWidth,
      CHeight,
      cropper,
      modalVisible,
      choseImg,
      afterImg,
      onOk,
      onCancel,
    };
  },
});
</script>

<style lang="stylus" scoped>
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
    text-align left
    .text
      font-size 12px
      font-family MicrosoftYaHeiUI
      color rgba(175, 177, 183, 1)
      line-height 26px
      span
        color rgba(68, 133, 240, 1)
  // .icon
  //   transform rotate(-90deg)
</style>
