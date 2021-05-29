<template>
  <div class="login">
    <div class="login_bgimg">
      <!-- 页头组件 -->
      <my-Header></my-Header>
      <!-- 地图 -->
      <div class="login_map"></div>
      <!-- 登录表单 -->
      <div class="login_form">
        <el-form>
          <!-- 用户名 -->
          <div class="login_form_uname">
            <i>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWxJREFUeNqsk70vQ1EYxm+rFkotBhEfiYWlEw1BaEwkuhIWYTX5AwwSicli7R/AyoAFaSQ0PgaJTWMwGAziKxI0/N54Kjc3t+0tnuSX9+R9z3nue+45J1Sf/nSKaACWFE2HsKj4o4e57xguYpKCfUhCtUgql/Jb4GdUA2mIQAaGRUY5q9V6F0V8jEagEe5gDF6Ut/G1ajZns1xH7YpZl4mjcVbjtiBbq1LM+9TynjkljV4VYz61mGdOSaNTxUFIuPIJ5UznQX72mevoD2BD+QltyXInQYxM07ADcZhx5S9gym9BMaNb6IFJz81eh7cgRq0wCt3QAs1Qp1o/zEJO12AbbgoLQ3prHbAK45ZzgskWbsEC7y1nRnFd/8LR2lf24FJbfFa+AZqgE4Zcl/LRTtO2tiwTa3kedvW1crJnsgZdsGIdPTGIQh8cO5WpF46s67BMHHVUqa4Uo+6b/f4Low+/4793/qCw80/6EmAAFIdLKa7dkv8AAAAASUVORK5CYII="
                alt=""
              />
            </i>
            <el-input @keyup.enter.native="login" v-model="input_phone" placeholder="请输入手机号"></el-input>
          </div>
          <div class="login_form_upwd">
            <i>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAR5JREFUeNpi5JvznwELYATiJCBOB2IDIAYpugbE04F4NpQPBh+TITQLFkOYgXgtEPujiYMMnAnETkAcDcR/kSWZsBhUiWTIBCA2heIJULFwIC5A14TuInYgLkYysANJ7gwQvwTidiAuhxr8F5eLdIBYAIh/AfFELK6dCJUTharF6TVeKP0CiL9jMeg7VA4EpAiFEQNyrOCRYyfGIJIBIzAdgWJhKhALk2nGWyDOBhn0hgJD4IaxIBlSA8RLSTQAlDBbQGaAXAQLPEUgfkCiQQpAfJ+YwNYG4qdQrI1PISGDAqHpBYQDKDFoKxJ7Gz6FLAQMugXE/5DYZBv0FYg9kdhEGRSNI/pvIcUQtuiHp2yqJEhQYGdDkzkDJVkEIMAA0hQ+IvGGBSUAAAAASUVORK5CYII="
                alt=""
              />
            </i>
            <!-- 密码 -->
            <el-input @keyup.enter.native="login" v-model="input_upwd" type="password" placeholder="请输入密码"></el-input>
          </div>
          <div class="login_form_button">
            <el-button @click="login" type="primary">登录</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '/scss/login.scss';
</style>
<script>
import myHeader from '@/components/MyHeader';
import { mapMutations } from 'vuex';
export default {
  name: 'MyHeader',
  components: {
    myHeader,
  },
  data() {
    return {
      //默认为空
      input_uname: '',
      input_phone: '',
      input_upwd: '',
    };
  },
  mounted() {},
  methods: {
    ...mapMutations(['setUname']),
    login() {
      //发送axios请求
      this.axios.post('/gcht/login', `phone=${this.input_phone}&upwd=${this.input_upwd}`).then((result) => {
        if (this.input_phone == 0) {
          this.$message.error('账户不能为空');
        } else if (this.input_upwd == 0) {
          this.$message.error('密码不能为空');
        } else if (this.input_phone == result.data.phone && this.input_upwd == result.data.upwd) {
          this.$message.success('登录成功');
          //登录成功跳转首页
          this.$router.push(`/index`);
          this.input_uname = result.data.uname;
        } else {
          this.$message.error('账户或密码错误');
        }
      });
    },
  },
};
</script>
