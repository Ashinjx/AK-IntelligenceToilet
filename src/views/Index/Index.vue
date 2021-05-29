<template>
  <div class="index">
    <div class="moduleChoice">
      <!-- 背景 -->
      <div class="index_bg">
        <!-- 页头组件 -->
        <my-Header></my-Header>
        <!-- 模块选择 -->
        <div class="content">
          <div class="router_wit" @click="toIntelligence"></div>
          <div class="router_warning" @click="toWarning"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import "/scss/index.scss";
</style>
<script>
import myHeader from "@/components/MyHeader";
export default {
  name: "MyHeader",
  components: {
    myHeader,
  },
  methods: {
    // 跳转路径
    toIntelligence() {
      this.$router.push(`/intelligenceToilet/lavatoryManagement`);
    },
    toWarning() {
      this.$router.push(`/warningMenage/alarmList`);
    },
  },
};
</script>
