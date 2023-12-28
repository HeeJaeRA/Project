import { createRouter, createWebHistory } from 'vue-router';
import user from './user';
import admin from './admin';
import seller from './seller';

const routes = [user, admin, seller];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		return { top: 0 };
	},
});

export default router;
