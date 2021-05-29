<template>
  <div class="home_select">
    <!-- 背景 -->
    <div class="home_select_bg">
      <!-- 页头组件 -->
      <my-Header></my-Header>
      <!-- 时间 -->
      <div id="time"></div>
      <!-- 侧边栏+搜索栏+表格+页脚 -->
      <div class="myMain">
        <!-- 侧边栏 -->
        <div class="main_side">
          <!-- 头像 -->
          <div class="side_user">
            <div class="user_title">用户信息</div>
            <div class="user_avatar" @click="showExit"></div>
            <div class="exit_login" :style="{ display: display }" @mouseleave="userHide">
              <div class="isExit" @click="isExit">退出登录</div>
            </div>
            <router-link to=""></router-link>
            <div class="user_name">{{ uname }}</div>
          </div>
          <!-- 侧边导航 -->
          <div class="side_nav">
            <div class="location_title">智慧公厕</div>
            <div class="side_nav_box">
              <div
                class="side_nav_public lavatory_bg"
                :class="{
                  lavatoryActive: lavatoryActive,
                }"
                @click="toLavatoryManagement"
              ></div>
              <div
                class="side_nav_public device_bg"
                :class="{
                  daviceActive: daviceActive,
                }"
                @click="toDeviceManagement"
              ></div>
            </div>
          </div>
        </div>
        <div class="main_right">
          <div class="main_location">
            <span>您的位置:</span>
            <span class="location_span">{{ routeFirst }}</span>
            <span class="location_span">{{ routeEnd }}</span>
          </div>
          <div class="main_center">
            <router-view></router-view>
          </div>
          <!-- 页脚 -->
          <div class="main_footer">
            <!-- 跳转首页 -->
            <div class="footer_home">
              <div class="router_btn" @click="toHome">首页</div>
            </div>
            <!-- 选择模块 -->
            <div class="footer_nav">
              <div class="footer_nav_bg">
                <div class="router_btn defaultActive">智慧公厕</div>
                <div class="router_btn" @click="toWaring">告警管理</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../../scss/public.scss';
</style>
<script>
import myHeader from '@/components/MyHeader';
import { mapState } from 'vuex';
export default {
  name: 'MyHeader',
  components: {
    myHeader,
  },

  data() {
    return {
      //退出登录
      display: 'none',
      //class绑定
      lavatoryActive: true,
      daviceActive: false,
      //时间
      myTime: null,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      //当前路径
      routeFirst: '智慧公厕',
      routeEnd: '-厕所管理',
    };
  },
  mounted() {
    this.time();
    //每秒刷新时间
    this.myTime = setInterval(() => this.time(), 1000);
  },
  computed: {
    ...mapState(['uname']),
  },
  beforeDestroy() {
    //销毁定时器
    clearInterval(this.myTime);
  },
  methods: {
    //实时时间
    time() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      var date = new Date().getDate();
      var hour = new Date().getHours();
      var minute = new Date().getMinutes();
      var day = new Date().getDay();
      if (month < 10) {
        month = '0' + month;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minute < 10) {
        minute = '0' + minute;
      }
      document.getElementById('time').innerHTML = `${year}年${month}月${date}日 &nbsp ${hour}时${minute}分 &nbsp 星期${this.week[day]}`;
    },
    //退出登录
    showExit() {
      this.display = 'block';
    },
    userHide() {
      this.display = 'none';
    },
    isExit() {
      this.$router.push('/');
    },
    //路由跳转
    toHome() {
      this.$router.push('/index');
    },
    toWaring() {
      this.$router.push('/warningMenage/alarmList');
    },
    toLavatoryManagement() {
      this.$router.push(`/intelligenceToilet/lavatoryManagement`);
      this.lavatoryActive = true;
      this.daviceActive = false;
      this.routeEnd = '-厕所管理';
    },
    toDeviceManagement() {
      this.$router.push(`/intelligenceToilet/deviceManagement`);
      this.daviceActive = true;
      this.lavatoryActive = false;
      this.routeEnd = '-设备管理';
    },
  },
};
</script>
