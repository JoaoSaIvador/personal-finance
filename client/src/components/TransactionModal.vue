<template>
	<div class="modal-overlay" @click="$emit('closeModal')">
		<div class="window" @click.stop>
			<div class="close" @click="$emit('closeModal')">
				<font-awesome-icon icon="fa-solid fa-xmark" />
			</div>
			<h6>Create Transaction</h6>
			<div
				class="input-group d-flex flex-row justify-content-center mt-3"
			>
				<b-button
					class="mr-1"
					variant="outline-dark"
					@click="$emit('closeModal')"
				>
					Cancel
				</b-button>
				<b-button variant="dark" @click="$emit('confirm', true)">
					Confirm
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TransactionModal",
		props: {},
		data() {
			return {};
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
		text-align: center;
		align-items: center;
		background-color: white;
		height: 20em;
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
		margin: 20px 0 0 0;
	}

	p {
		font-size: 16px;
		margin: 30px 0 10px 0;
	}
</style>
