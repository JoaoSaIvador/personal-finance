<template>
	<div
		class="page-content bg-light d-flex flex-column justify-content-between align-items-center"
	>
		<h6>Create Transaction</h6>

		<form>
			<div
				class="form-group d-flex flex-column justify-content-center align-items-start"
			>
				<label for="formGroupPurpose">Purpose:</label>
				<input
					v-model="transaction.purpose"
					type="text"
					class="form-control"
					id="formGroupPurpose"
					placeholder="Laptop"
				/>
			</div>
			<div
				class="form-group d-flex flex-column justify-content-center align-items-start"
			>
				<label for="formGroupCategory">Category:</label>
				<select
					class="form-control"
					v-model="transaction.category"
					id="formGroupCategory"
				>
					<option
						v-for="category in categories"
						:key="category"
						:value="category"
					>
						{{ category }}
					</option>
				</select>
			</div>
			<div
				class="form-group d-flex flex-column justify-content-center align-items-start"
			>
				<label for="formGroupValue">Value:</label>
				<input
					v-model="transaction.value"
					type="number"
					class="form-control"
					id="formGroupValue"
					placeholder="0.00"
				/>
			</div>
		</form>

		<div class="input-group d-flex flex-row justify-content-center mt-3">
			<b-button
				variant="dark"
				@click="$emit('createTransaction', transaction)"
			>
				Confirm
			</b-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "CreateTransaction",
		props: {},
		data() {
			return {
				transaction: {
					purpose: "",
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
		margin: 0 0 1em 0;
	}
</style>
