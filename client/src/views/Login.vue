<template>
	<div class="primary-div">
		<b-container class="h-100 d-flex align-items-center">
			<b-container
				class="page-content d-flex flex-column align-items-center bg-light p-5"
			>
				<h2 class="mb-3">Sign in</h2>
				<b-form @submit.prevent="onSubmit">
					<div>
						<b-form-group
							id="email-label"
							label="Email:"
							label-for="email"
						>
							<b-input
								id="email"
								v-model.trim="user.email"
								placeholder="Enter your email"
							></b-input>
						</b-form-group>
					</div>

					<div class="mt-3">
						<b-form-group
							id="password-label"
							label="Password:"
							label-for="password"
						>
							<b-input
								id="password"
								v-model.trim="user.password"
								type="password"
								placeholder="Enter your password"
							></b-input>
						</b-form-group>
					</div>

					<div class="d-flex flex-row justify-content-center mt-5">
						<b-button variant="dark" type="submit">
							Login
						</b-button>
						<b-button
							class="ml-2 btn"
							variant="outline-dark"
							@click="$router.push('register')"
						>
							Register
						</b-button>
					</div>
				</b-form>
			</b-container>
		</b-container>
	</div>
</template>
<script>
	import axios from "axios/dist/axios";

	export default {
		data() {
			return {
				user: {
					email: null,
					password: null,
				},
			};
		},
		methods: {
			onSubmit() {
				axios
					.post(
						"http://localhost:4000/api/user/login",
						{
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
		height: auto;
		margin-top: 3em;
	}
</style>
