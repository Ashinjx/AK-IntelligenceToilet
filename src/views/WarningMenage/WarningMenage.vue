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
            <div class="user_name">{{ user_name }}</div>
          </div>
          <!-- 侧边导航 -->
          <div class="side_nav">
            <div class="location_title">告警管理</div>
            <div class="side_nav_box">
              <div class="side_nav_public alarmList_bg" :class="{ alarmListActive: alarmListActive }" @click="toAlarmList"></div>
              <div class="side_nav_public alarmTemplate_bg" :class="{ alarmTemplateActive: alarmTemplateActive }" @click="toAlarmTemplate"></div>
              <div class="side_nav_public monitorItem_bg" :class="{ monitorItemActive: monitorItemActive }" @click="toMonitorItemA"></div>
              <div class="side_nav_public monitorType_bg" :class="{ monitorTypeActive: monitorTypeActive }" @click="toMonitorType"></div>
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
                <div class="router_btn" @click="toLavatory">智慧公厕</div>
                <div class="router_btn defaultActive">告警管理</div>
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
export default {
  name: 'MyHeader',
  components: {
    myHeader,
  },
  data() {
    return {
      //用户名
      user_name: '超级管理员',
      //退出登录
      display: 'none',
      //class绑定
      alarmListActive: true,
      alarmTemplateActive: false,
      monitorItemActive: false,
      monitorTypeActive: false,
      //时间
      myTime: null,
      week: ['日', '一', '二', '三', '四', '五', '六'],
      //当前路径
      routeFirst: '告警管理',
      routeEnd: '-告警列表',
    };
  },
  mounted() {
    this.time();
    //每秒刷新时间
    this.myTime = setInterval(() => this.time(), 1000);
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
    toLavatory() {
      this.$router.push('/intelligenceToilet/lavatoryManagement');
    },
    toAlarmList() {
      this.$router.push(`/warningMenage/alarmList`);
      this.alarmListActive = true;
      this.alarmTemplateActive = false;
      this.monitorItemActive = false;
      this.monitorTypeActive = false;
      this.routeEnd = '-告警列表';
    },
    toAlarmTemplate() {
      this.$router.push(`/warningMenage/alarmTemplate`);
      this.alarmTemplateActive = true;
      this.alarmListActive = false;
      this.monitorItemActive = false;
      this.monitorTypeActive = false;
      this.routeEnd = '-告警模板';
    },
    toMonitorItemA() {
      this.$router.push(`/warningMenage/monitorItem`);
      this.monitorItemActive = true;
      this.alarmTemplateActive = false;
      this.alarmListActive = false;
      this.monitorTypeActive = false;
      this.routeEnd = '-监测项';
    },
    toMonitorType() {
      this.$router.push(`/warningMenage/monitorType`);
      this.monitorTypeActive = true;
      this.monitorItemActive = false;
      this.alarmTemplateActive = false;
      this.alarmListActive = false;
      this.routeEnd = '-监测类型';
    },
  },
};
</script>
