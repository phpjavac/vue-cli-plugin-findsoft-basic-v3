<template lang='pug'>
.user-info
  .left-info
    .head-image
      img(:src='img')
      .name {{ form.name }}
      .code id: {{ form.code }}
    .tabs
      .tab-item(:class='{ active: title === "我的资料" }', @click='title = "我的资料"') 我的资料
      .tab-item(:class='{ active: title === "修改密码" }', @click='title = "修改密码"') 修改密码
  .right-info
    .title {{ title }}
    .user-container(v-if='title === "我的资料"')
      a-form(:model='form', :labelCol='{ span: 2 }', :wrapperCol='{ span: 4 }')
        a-form-item(label='头像')
          img(:src='img', style='width: 80px')
        a-form-item(label='账号')
          div {{ form.code }}
        a-form-item(label='班级')
          div {{ form.code }}
        a-form-item(label='姓名')
          a-input(v-model:value='form.name')
        a-form-item(label='个人简介', :wrapperCol='{ span: 14 }')
          a-textarea(v-model:value='form.personalSignature', :maxLength='500')
        .buttons(style='padding-left: 8%')
          a-button(type='primary', @click='ok') 确定
          a-button(style='margin-left: 12px', @click='back') 取消
    .user-container(v-if='title === "修改密码"')
      a-form(
        :model='formPassWord',
        :labelCol='{ span: 2 }',
        :wrapperCol='{ span: 4 }'
      )
        a-form-item(label='原密码')
          a-input-password.password(
            v-model:value='formPassWord.oldPassword',
            placeholder='请输入现在使用的密码'
          )
        a-form-item(label='新密码')
          a-input-password.password(
            v-model:value='formPassWord.newPassword',
            placeholder='8位数以上的新密码'
          )
        a-form-item(label='确认密码')
          a-input-password.password(
            v-model:value='password',
            placeholder='请再次输入新密码'
          )
        .buttons(style='padding-left: 8%')
          a-button(type='primary', @click='passWordOk') 确定
          a-button(style='margin-left: 12px', @click='back') 取消
</template>
<script lang='ts'>
import {
  reactive, ref, onMounted,
} from 'vue';
import {
  Form, Input, Button, message,
} from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aTextarea: Input.TextArea,
    aInputPassword: Input.Password,
    aButton: Button,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = reactive({
      code: '',
      name: '',
      personalSignature: '',
    });
    const img = ref('');

    const title = ref('我的资料');

    const formPassWord = reactive({
      code: '',
      oldPassword: '',
      newPassword: '',
    });
    const password = ref('');
    // 更改个人信息
    function ok() {
      store.dispatch('userInfo/changeUserSignature', form).then(() => {
        store.dispatch('user/getByCode');
      });
    }
    // 改密码
    function passWordOk() {
      return new Promise((resolve, reject) => {
        if (formPassWord.newPassword !== password.value) {
          message.info('两次密码输入不一致！');
          return;
        }
        if (formPassWord.newPassword.length < 8) {
          message.info('密码长度过短！');
          return;
        }
        store
          .dispatch('userInfo/changePassword', formPassWord)
          .then((res) => {
            formPassWord.newPassword = '';
            formPassWord.oldPassword = '';
            password.value = '';
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    // 返回
    function back() {
      router.go(-1);
    }
    onMounted(() => {
      store.dispatch('user/getByCode').then((res) => {
        formPassWord.code = res.code;
        form.code = res.code;
        form.name = res.name;
        form.personalSignature = res.personalSignature;
        img.value = res.headImagePath;
      });
    });
    return {
      title,
      form,
      formPassWord,
      password,
      ok,
      back,
      passWordOk,
      img,
    };
  },
};
</script>
<style lang='stylus' scoped>
.password
  width 190px
.user-info
  display flex
  .left-info
    max-width 282px
    min-width 282px
    .head-image
      background #fff
      text-align center
      padding 28px
      img
        width 92px
        height 92
        border-radius 50%
      .name
        font-size 16px
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        color rgba(42, 46, 54, 0.75)
        margin-top 12px
        margin-bottom 4px
      .code
        font-size 12px
        font-family PingFangSC-Medium, PingFang SC
        font-weight 500
        color rgba(153, 153, 153, 1)
    .tabs
      background #ffffff
      margin-top 16px
      padding 16px 0
      .tab-item
        cursor pointer
        font-size 14px
        font-family PingFangSC-Regular, PingFang SC
        font-weight 400
        color rgba(42, 46, 54, 0.75)
        padding-left 48px
        height 40px
        line-height 40px
        border-left 2px solid #fff
      .active
        background rgba(242, 250, 255, 1)
        border-left 2px solid #498CE9
        color rgba(73, 140, 233, 1)
  .right-info
    margin-left 24px
    flex 1
    background #ffffff
    padding 16px 24px
    .title
      font-size 20px
      font-family PingFangSC-Regular, PingFang SC
      font-weight 400
      color rgba(0, 0, 0, 0.85)
      height 60px
      line-height 60px
      border-bottom 1px solid #F2F3F5
    .user-container
      padding 28px 0
</style>
