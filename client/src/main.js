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
// mixin
import mixins from "./mixins";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

createApp(App)
	.use(router)
	.use(store)
	.use(VueSweetalert2)
	.use(DataTable)
	.use(VueGoogleCharts)
	.mixin(mixins)
	.component('VueDatePicker', VueDatePicker)
	.mount('#app');
