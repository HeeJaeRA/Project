<template>
	<div>
		<Header />
		<nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</nav>
		<router-view />
		<Footer />
	</div>
</template>
<script>
import Header from './layouts/Header.vue';
import Footer from './layouts/Footer.vue';
export default {
	components: {
		Header,
		Footer,
	},
};
</script>
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
