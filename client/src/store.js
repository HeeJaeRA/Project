import { createStore } from 'vuex';

import persistedStage from 'vuex-persistedstate';

const store = createStore({
	state() {
		return {
			user: {},
		};
	},
	mutations: {
		user(state, data) {
			state.user = data;
		},
	},
	plugins: [
		persistedStage({
			path: ['user'],
		}),
	],
});

export default store;
