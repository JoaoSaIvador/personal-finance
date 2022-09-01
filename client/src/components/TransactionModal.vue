<template>
	<div class="modal-overlay" @click="$emit('closeModal')">
		<div class="window" @click.stop>
			<div class="close" @click="$emit('closeModal')">
				<font-awesome-icon icon="fa-solid fa-xmark" />
			</div>
			<h6>Update Transaction</h6>

			<b-form class="needs-validation" :disabled="!isFormValid">
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
			</b-form>

			<div
				class="input-group d-flex flex-row justify-content-center mt-3"
			>
				<b-button
					class="mr-2"
					variant="outline-dark"
					@click="$emit('closeModal')"
				>
					Cancel
				</b-button>
				<b-button
					variant="dark"
					@click="$emit('updateTransaction', transaction)"
				>
					Confirm
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TransactionModal",
		props: {
			transaction: Object,
		},
		data() {
			return {
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
	};
</script>

<style scoped>
	.modal-overlay {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #000000da;
		z-index: 4;
	}

	.window {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		height: auto;
		width: 30em;
		padding: 20px 20px;
		border-radius: 20px;
	}
	.close {
		align-self: flex-end;
		cursor: pointer;
	}

	h6 {
		font-weight: 500;
		font-size: 28px;
		margin: 0 0 1em 0;
	}
</style>
