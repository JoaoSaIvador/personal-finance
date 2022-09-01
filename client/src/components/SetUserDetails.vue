<template>
	<b-form
		class="needs-validation w-100 px-5"
		:disabled="!isFormValid"
		@submit.prevent="this.$emit('onSubmit')"
	>
		<div v-if="type === 'register'">
			<b-form-group
				id="username-label"
				label="Username:"
				label-for="username"
				:invalid-feedback="invalidUsernameFeedback"
				:state="isUsernameValid"
			>
				<b-input
					id="username"
					v-model.trim="user.username"
					placeholder="Enter your username"
					:state="isUsernameValid"
				></b-input>
			</b-form-group>
		</div>

		<div class="">
			<b-form-group
				id="email-label"
				label="Email:"
				label-for="email"
				:invalid-feedback="invalidEmailFeedback"
				:state="isEmailValid"
			>
				<b-input
					id="email"
					ref="email"
					v-model.trim="user.email"
					type="email"
					placeholder="Enter your email"
					:state="isEmailValid"
				></b-input>
			</b-form-group>
		</div>

		<div class="mt-3">
			<b-form-group
				id="password-label"
				label="Password:"
				label-for="password"
				:invalid-feedback="invalidPasswordFeedback"
				:state="isPasswordValid"
			>
				<b-input
					id="password"
					v-model.trim="user.password"
					type="password"
					placeholder="Enter your password"
					:state="isPasswordValid"
				></b-input>
			</b-form-group>
		</div>
	</b-form>
</template>

<script>
	export default {
		props: {
			type: String,
		},
		data() {
			return {
				user: {
					email: null,
					password: null,
					username: null,
				},
			};
		},
		computed: {
			invalidPasswordFeedback() {
				if (this.isCreate && !this.user.password) {
					return "You must insert a password.";
				}

				if (!this.user.password) {
					return null;
				}
				let passwordLen = this.user.password.length;
				if (passwordLen < 3 || passwordLen > 20) {
					return "The password must be between [6, 20] characters.";
				}
				return "";
			},

			isPasswordValid() {
				if (this.invalidPasswordFeedback === null) {
					return null;
				}
				return this.invalidPasswordFeedback === "";
			},

			invalidUsernameFeedback() {
				if (this.isCreate && !this.user.username) {
					return "You must insert a username.";
				}

				if (!this.user.username) {
					return null;
				}
				let usernameLen = this.user.username.length;
				if (usernameLen < 3 || usernameLen > 15) {
					return "The username must be between [3, 15] characters.";
				}
				return "";
			},

			isUsernameValid() {
				if (this.invalidUsernameFeedback === null) {
					return null;
				}
				return this.invalidUsernameFeedback === "";
			},

			invalidEmailFeedback() {
				if (this.isCreate && !this.user.email) {
					return "You must insert an email.";
				}

				if (!this.user.email) {
					return null;
				}

				if (this.$refs.email && !this.$refs.email.checkValidity()) {
					return "Invalid email address";
				}

				return "";
			},

			isEmailValid() {
				if (this.invalidEmailFeedback === null) {
					return null;
				}
				return this.invalidEmailFeedback === "";
			},

			isFormValid() {
				if (!this.isUsernameValid) {
					return false;
				}

				if (!this.isEmailValid) {
					return false;
				}

				if (!this.isPasswordValid) {
					return false;
				}

				return true;
			},
		},
	};
</script>
