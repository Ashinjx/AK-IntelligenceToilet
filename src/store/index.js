import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //用户名
    uname: '超级管理员',
  },
  mutations: {
    setUname(state, uname) {
      state.uname = uname;
    },
  },
  actions: {},
  modules: {},
});
