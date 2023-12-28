import { createApp } from 'vue';
import App from './App.vue';
import 'jquery'; // Import jQuery first
// 라우터
import router from './router/index';
// vuex-store
import store from './store';
// alert창
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// datatable
import DataTable from 'datatables.net-vue3';
import 'datatables.net-dt/css/jquery.dataTables.css';
// 구글차트
import VueGoogleCharts from 'vue-google-charts';

createApp(App).use(router).use(store).use(VueSweetalert2).use(DataTable).use(VueGoogleCharts).mount('#app');
