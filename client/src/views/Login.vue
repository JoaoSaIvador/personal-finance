<template>
	<div class="primary-div">
		<b-container class="h-100 d-flex align-items-center">
			<b-container
				class="page-content d-flex flex-column justify-content-between align-items-center bg-light p-5"
			>
				<h2 class="mb-5">Sign in</h2>

				<SetUserDetails @onSubmit="onSubmit" type="login" />
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
			return {};
		},
		methods: {
			onSubmit(user) {
				axios
					.post(
						"http://localhost:4000/api/user/login",
						{
							email: user.email,
							password: user.password,
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
		},
	};
</script>

<style scoped>
	.page-content {
		width: 500px;
		min-height: auto;
	}
</style>
