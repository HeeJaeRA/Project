// 유저화면
import UserLayout from '../views/UserTemplate.vue';
import UserMain from '../views/user/UserMain.vue';

export default {
	path: '/',
	name: 'user',
	component: UserLayout,
	children: [
		{
			path: '/home',
			name: 'userHome',
			component: UserMain,
		},
	],
};
