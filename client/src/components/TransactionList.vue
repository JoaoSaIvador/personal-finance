<template>
	<div class="page-content bg-light"></div>
</template>

<script>
	export default {
		name: "TransactionList",
		components: {},
	};
</script>

<style scoped>
	.page-content {
		padding: 0 60px 0 60px;
		border-radius: 20px;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 14px 28px,
			rgba(0, 0, 0, 0.05) 0px 10px 10px;
	}

	@media screen and (max-width: 1200px) and (min-width: 501px) {
		.page-content {
			width: 50vw;
			height: 80vh;
		}
	}

	@media screen and (min-width: 1201px) {
		.page-content {
			width: 700px;
			height: 750px;
		}
	}

	@media screen and (max-width: 500px) {
		.page-content {
			width: 80vw;
			height: 60vh;
		}
	}
</style>
