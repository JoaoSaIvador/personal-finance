<template>
	<div
		class="page-content bg-light d-flex flex-column justify-content-between align-items-center"
	>
		<h6>Create Transaction</h6>

		<b-form class="needs-validation w-100" :disabled="!isFormValid">
			<div class="w-100">
				<b-form-group
					label="Purpose:"
					label-for="formGroupPurpose"
					:invalid-feedback="invalidPurposeFeedback"
					:state="isPurposeValid"
				>
					<b-form-input
						id="formGroupPurpose"
						v-model="transaction.purpose"
						type="text"
						placeholder="Laptop"
						:state="isPurposeValid"
						required
					></b-form-input>
				</b-form-group>
			</div>
			<div class="w-100">
				<b-form-group label="Category:" label-for="formGroupCategory">
					<b-select
						id="formGroupCategory"
						v-model="transaction.category"
						required
					>
						<option
							v-for="category in categories"
							:key="category"
							:value="category"
						>
							{{ category }}
						</option>
					</b-select>
				</b-form-group>
			</div>
			<div class="w-100">
				<b-form-group
					label="Value:"
					label-for="formGroupValue"
					:invalid-feedback="invalidValueFeedback"
					:state="isValueValid"
				>
					<b-form-input
						id="formGroupValue"
						v-model="transaction.value"
						type="number"
						placeholder="0.00"
						:state="isValueValid"
						required
					></b-form-input>
				</b-form-group>
			</div>
		</b-form>

		<b-button
			variant="dark"
			:disabled="!isFormValid"
			@click="$emit('createTransaction', transaction)"
		>
			Confirm
		</b-button>
	</div>
</template>

<script>
	export default {
		name: "CreateTransaction",
		props: {},
		data() {
			return {
				transaction: {
					purpose: null,
					category: "Shopping",
					value: null,
				},
				categories: [
					"Shopping",
					"Food & Drinks",
					"Bills & Utilities",
					"Others",
				],
			};
		},
		computed: {
			invalidPurposeFeedback() {
				if (!this.transaction.purpose) {
					return null;
				}

				if (this.transaction.purpose == "") {
					return "You must insert a purpose";
				}

				return "";
			},

			isPurposeValid() {
				if (this.invalidPurposeFeedback === null) {
					return null;
				}
				return this.invalidPurposeFeedback === "";
			},

			invalidValueFeedback() {
				if (!this.transaction.value) {
					return null;
				}

				if (this.transaction.value == "") {
					return "You must insert a value";
				}

				if (this.transaction.value <= 0) {
					return "The value must be superior to 0";
				}

				return "";
			},

			isValueValid() {
				if (this.invalidValueFeedback === null) {
					return null;
				}
				return this.invalidValueFeedback === "";
			},

			isFormValid() {
				if (!this.isPurposeValid) {
					return false;
				}

				if (!this.isValueValid) {
					return false;
				}

				return true;
			},
		},
		methods: {},
	};
</script>

<style scoped>
	@media screen and (min-width: 1201px) {
		.page-content {
			width: 350px;
			height: 450px;
		}
	}

	h6 {
		font-weight: 500;
		font-size: 26px;
	}
</style>
