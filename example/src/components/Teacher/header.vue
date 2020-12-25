<template lang="pug">
.the-header
  .logo-or-name(@click="back")
    img.logo(src="static/logo/logoNav.png")
    .name {{ softConfig.softName }}
  .navigation-bar(v-if="!user.student")
    .items(
      v-for="(item, index) in navList",
      :class="{ active: index === active }",
      @click="changePath(item.path)"
    ) {{ item .name }}
  .navigation-bar(v-else)
  .user-profile(ref="userProfile")
    a-badge
      a-icon(type="bell", :style="{ fontSize: '24px', cursor: 'pointer' }")
    a-popover(
      placement="bottom",
      :getPopupContainer="() => $refs.userProfile"
    )
      template(slot="content")
        .menu
          .menu-item(@click="changePath('/Teacher/userInfo')")
            a-icon(type="user", :style="{ fontSize: '16px' }")
            span 个人中心
          .menu-item(@click="outLogin")
            a-icon(type="import", :style="{ fontSize: '16px' }")
            span 退出账号
      .user
        a-avatar(shape="square", :size="32", :src="user.headImagePath")
        .name {{ user.name }}
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import {
  Badge, Icon, Avatar, Popover,
} from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    aBadge: Badge,
    aIcon: Icon,
    aAvatar: Avatar,
    aPopover: Popover,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const navList = [
      {
        name: '用户管理',
        path: '/Teacher/userlist',
      },
      {
        name: '班级管理',
        path: '/Teacher/classlist',
      },
      {
        name: '实验管理',
        path: '/Teacher/distributecase',
      },
      {
        name: '报告管理',
        path: '/Teacher/reportmanage',
      },
      {
        name: '资料中心',
        path: '/Teacher/datacenter',
      },
      {
        name: '自定义',
        path: '/Teacher/customcase',
      },
    ];

    function changePath(path: string) {
      if (route.path === path) {
        return;
      }
      router.push(path);
    }
    function outLogin() {
      localStorage.clear();
      sessionStorage.clear();
      router.go(0);
    }
    function back() {
      if (sessionStorage.role === 'student') {
        router.push('/Student');
      } else {
        router.push('/Teacher/userlist');
      }
    }
    const active = computed(() => navList.findIndex(((value) => route.path === value.path)));
    const softConfig = computed(() => store.state.system.softConfig);
    const user = computed(() => store.state.user.user);
    return {
      navList,
      changePath,
      outLogin,
      active,
      softConfig,
      back,
      user,
    };
  },
});
</script>
<style lang="stylus" scoped>
.the-header
  min-width 1366px
  height 60px
  background rgba(255, 255, 255, 1)
  display flex
  align-items center
  padding 0 90px 0 110px
  .logo-or-name
    display flex
    cursor pointer
    .logo
      width 24px
      height 18px
      margin-right 8px
    .name
      font-size 14px
      font-family MicrosoftYaHeiUI
      color rgba(42, 46, 54, 1)
  .navigation-bar
    display flex
    align-items center
    margin-left 48px
    font-size 14px
    font-family MicrosoftYaHeiUI
    color rgba(42, 46, 54, 1)
    height 100%
    line-height 100%
    flex 1
    .items
      cursor pointer
      height 100%
      line-height 60px
      text-align center
      width 90px
    .active
      color rgba(74, 144, 226, 1)
      border-bottom 3px solid #4A90E2
  .user-profile
    display flex
    align-items center
    width 130px
    justify-content space-between
    font-size 14px
    font-family MicrosoftYaHeiUI
    color rgba(42, 46, 54, 1)
    :deep()
        .ant-popover-inner-content
            padding 0
    .user
      cursor pointer
      display flex
      align-items center
      .name
        margin-left 16px
    .menu
      width 120px
      padding 0 16px
      padding-top 16px
      .menu-item
        cursor pointer
        height 36px
        font-size:14px;
        font-family:MicrosoftYaHeiUI;
        color:rgba(42,46,54,1);
        text-align center
        display flex
        justify-content: space-between;
</style>
