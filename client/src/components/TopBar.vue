<template>
	<b-navbar
		type="light"
		variant="light"
		class="custom-navbar d-flex flex-row justify-content-between"
	>
		<b-navbar-brand>Personal Finance</b-navbar-brand>
		<b-navbar-nav v-if="isDashboard" class="ml-auto">
			<b-nav-item @click="$router.push('/')">Dashboard</b-nav-item>
			<b-nav-item @click="logout">Logout</b-nav-item>
		</b-navbar-nav>
	</b-navbar>
</template>

<script>
	export default {
		name: "TopBar",
		methods: {
			logout() {},
		},
		computed: {
			isDashboard() {
				return this.$route.name === "dashboard";
			},
		},
	};
</script>

<style scoped>
	.custom-navbar {
		box-shadow: rgba(0, 0, 0, 0.02) 0px 14px 28px,
			rgba(0, 0, 0, 0.02) 0px 10px 10px;
		padding-right: 10%;
		padding-left: 10%;
	}
</style>
