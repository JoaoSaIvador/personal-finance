<template>
	<div class="primary-div">
		<b-container class="h-100 d-flex align-items-center">
			<b-container
				class="page-content d-flex flex-column justify-content-between align-items-center bg-light p-5"
			>
				<h2 class="mb-5">Sign up</h2>

				<SetUserDetails @onSubmit="onSubmit" type="register" />

				<div class="d-flex flex-row justify-content-center mt-5">
					<b-button variant="dark" type="submit"> Register </b-button>
					<b-button
						class="ml-2 btn"
						variant="outline-dark"
						@click="$router.push('login')"
					>
						Login
					</b-button>
				</div>
			</b-container>
		</b-container>
	</div>
</template>
<script>
	import axios from "axios/dist/axios";
	import SetUserDetails from "@/components/SetUserDetails";

	export default {
		components: {
			SetUserDetails,
		},
		data() {
			return {
				user: {
					username: null,
					password: null,
					email: null,
				},
			};
		},
		methods: {
			onSubmit() {
				axios
					.post(
						"http://localhost:4000/api/user/register",
						{
							username: this.user.username,
							email: this.user.email,
							password: this.user.password,
						},
						{
							withCredentials: true,
						}
					)
					.then((res) => {
						if (res.status === 200) {
							localStorage.setItem("token", res.data.token);
							this.$router.push("/");
						}
					});
			},
			onReset() {
				this.user = null;
			},
		},
	};
</script>

<style scoped>
	.page-content {
		width: 500px;
		min-height: auto;
	}
</style>
