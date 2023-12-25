import { createStore } from 'vuex';

import createPersistedState from 'vuex-persistedstate';

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
		createPersistedState({
			path: ['user'],
		}),
	],
});

export default store;
