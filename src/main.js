import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./sass/main.scss";
import { createI18n } from "@/i18n/index";
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000'
import middleware from "./middleware"
export const bus = new Vue();

const i18n = createI18n(store.state.translation.locale).i18n;
Vue.config.productionTip = false;

export const app = new Vue({
  router,
  middleware,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
