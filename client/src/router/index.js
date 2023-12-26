import { createRouter, createWebHistory } from 'vue-router';
import user from './user';
import admin from './admin';

const routes = [user, 
				admin];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
