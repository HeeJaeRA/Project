import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UserLayout from '../views/user/UserForm.vue';
import UserMain from '../views/user/UserMain.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/user',
		name: 'user',
		component: UserLayout,
		children: [
			{
				path: '/user/home',
				name: 'userHome',
				component: UserMain,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
