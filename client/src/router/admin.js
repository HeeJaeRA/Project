// 관리자화면
import AdminLayout from '../views/AdminTemplate.vue';
import AdminMain from '../views/admin/AdminMain.vue';
import AdminTest from '../views/admin/AdminTest.vue';
import AdminTable from '../views/admin/AdminTable.vue';

export default {
	path: '/admin',
	name: 'admin',
	component: AdminLayout,
	children: [
		{
			path: 'home',
			name: 'adminHome',
			component: AdminMain,
		},
		{
			path: 'test',
			name: 'adminTest',
			component: AdminTest,
		},
		{
			path: 'table',
			name: 'adminTable',
			component: AdminTable,
		},
	],
};
