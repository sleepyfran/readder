import Vue from "vue";
import App from "@view/App.vue";
import router from "./router";
import store from "@vuex/store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
