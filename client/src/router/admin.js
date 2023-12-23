// 관리자화면
import AdminLayout from '../views/AdminTemplate.vue';
import AdminMain from '../views/admin/AdminMain.vue';

export default {
	path: '/admin',
	name: 'admin',
	component: AdminLayout,
	children: [
		{
			path: '/admin/home',
			name: 'adminHome',
			component: AdminMain,
		},
	],
};
