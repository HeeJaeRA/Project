// 유저화면
import UserLayout from '../views/UserTemplate.vue';
import UserMain from '../views/user/UserMain.vue';
import UserLogin from '../views/user/UserLogin.vue';
import UserJoin from '../views/user/UserJoin.vue';

export default {
	path: '/',
	name: 'user',
	component: UserLayout,
	children: [
		{
			path: 'home',
			name: 'userHome',
			component: UserMain,
		},
		{
			path: 'login',
			name: 'userLogin',
			component: UserLogin,
		},
		{
			path: 'join',
			name: 'userJoin',
			component: UserJoin,
		},
		
	],
};
