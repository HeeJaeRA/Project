import { createApp } from "vue";
import App from "./App.vue";
import "jquery"; // Import jQuery first
// 라우터
import router from "./router/index";
// vuex-store
import store from "./store";
// alert창
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// datatable
import DataTable from "datatables.net-vue3";
import "datatables.net-dt/css/jquery.dataTables.css";
// bootstrap3
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
// 구글차트
import VueGoogleCharts from "vue-google-charts";
//믹스인
import mixin from "./mixin";
createApp(App)
  .use(router)
  .use(store)
  .use(VueSweetalert2)
  .use(BootstrapVue3)
  .use(DataTable)
  .use(VueGoogleCharts)
  .mixin(mixin)
  .mount("#app");
