import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 1. 创建一个全局bus, 用来跨级传值
Vue.prototype.$bus = new Vue();
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
