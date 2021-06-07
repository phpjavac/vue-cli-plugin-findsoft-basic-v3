<template lang="pug">
.main
  PageHeader(title='上传组件')
  .show.flex.flex-row.justify-between
    .content.box-shadow-ccc.base
      a-form()
        a-form-item(label="上传图片")
          upload-img(v-bind='uploadOption' :oldImgSrc='`${uploadOption.hasImg?"http://dummyimage.com/64x64":""}`')
            template(#prefix v-if='uploadOption.icon')
              a-icon(
                :class='`${uploadOption.icon === "icontuichu11" ? "icont" : "icon"}`'
                :type="uploadOption.icon")
    .card.box-shadow-ccc.base
      a-form()
        a-form-item(label='组件禁用')
          a-switch(v-model:checked="uploadOption.disabled")
        a-form-item(label='图片填充')
          a-switch(v-model:checked="uploadOption.hasImg")
        a-form-item(label='限制大小')
          a-input-number(v-model:value='uploadOption.fileSize' :min='0')
        a-form-item(label='更换尺寸')
          a-select(
            style='width: 120px'
            v-model:value='uploadOption.aspectRatio'
            placeholder='请选择'
            :default-active-first-option="false"
            :filterOption='false'
          )
            a-select-option( v-for="v in sizeList" :key="v.title" :value='v.aspectRatio') {{v.title}}
        a-form-item(label='切换icon')
          a-select(
            style='width: 120px'
            v-model:value='uploadOption.icon'
            placeholder='请选择'
            :default-active-first-option="false"
            :filterOption='false'
          )
            a-select-option( v-for="v in iconList" :key="v.value" :value='v.value') {{v.title}}
</template>

<script lang="ts">
import {
  Form, Select, InputNumber, Switch,
} from 'ant-design-vue';
import {
  defineAsyncComponent, defineComponent, reactive, ref,
} from 'vue';

const iconList = [
  {
    title: '上传',
    value: 'icontuichu11',
  },
  {
    title: '重置',
    value: 'iconzhongzhi',
  },
  {
    title: '分享',
    value: 'iconfenxiang',
  },
  {
    title: '查看',
    value: 'iconchakan',
  },
  {
    title: '下载',
    value: 'iconxiazai1',
  },
  // {
  //   title: '编辑',
  //   value: 'iconbianji4',
  // },
  // {
  //   title: '筛选',
  //   value: 'iconshaixuan1',
  // },
  // {
  //   title: '排序',
  //   value: 'iconorder-asc',
  // },
];
const aspectRatioList = [
  {
    aspectRatio: 2,
    title: '2:1',
  },
  {
    aspectRatio: 16 / 9,
    title: '16:9',
  },
  {
    aspectRatio: 4 / 3,
    title: '4:3',
  },
  {
    aspectRatio: 1,
    title: '1:1',
  },
  {
    aspectRatio: NaN,
    title: '自由',
  }
];

export default defineComponent({
  components: {
    PageHeader: defineAsyncComponent(() => import('@/components/Public/Exhibition/PageHeader.vue')),
    UploadImg: defineAsyncComponent(() => import('@/components/UploadImg.vue')),
    aForm: Form,
    aFormItem: Form.Item,
    aSelect: Select,
    aSelectOption: Select.Option,
    aInputNumber: InputNumber,
    aSwitch: Switch,
    aIcon: defineAsyncComponent(() => import('@/components/BaseIcon.vue')),
  },
  props: {},
  setup() {
    const uploadOption = reactive({
      fileSize: 2,
      hasImg: true,
      aspectRatio: 1,
      disabled: false,
      icon: 'icontuichu11',
    });
    const sizeList = ref(aspectRatioList);

    return {
      uploadOption,
      iconList,
      sizeList,
    };
  },
});
</script>

<style lang="stylus" scoped>
.main
  .show
    .base
      background #fff
      padding 20px
      border-radius $border-radius-base
    .content
      width 55%
      .icont
        transform rotate(-90deg)
    .card
      width 40%
</style>
