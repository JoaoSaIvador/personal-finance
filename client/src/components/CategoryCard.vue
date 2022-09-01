<template>
	<div class="category-card card bg-light text-dark text-center p-3">
		<h5>{{ card.title }}</h5>
	</div>
</template>

<script>
	export default {
		name: "CategoryCard",
		props: {
			card: Object,
		},
	};
</script>

<style scoped>
	.category-card {
		border: none;
		border-radius: 20px;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease-in-out;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 14px 28px,
			rgba(0, 0, 0, 0.05) 0px 10px 10px;
	}

	.category-card:hover {
		box-shadow: rgba(0, 0, 0, 0.3) 0px 14px 28px,
			rgba(0, 0, 0, 0.3) 0px 10px 10px;
		background-color: #343a40 !important;
		color: white !important;
	}

	@media screen and (min-width: 1201px) {
		.category-card {
			margin: 3em 1.5em 3em 1.5em;
			height: 150px;
			width: 229px;
		}
	}

	@media screen and (max-width: 1200px) {
		.category-card {
			height: 120px;
			width: 190px;
			margin: 3em 1.5em 0em 1.5em !important;
		}
	}

	@media screen and (max-width: 800px) {
		.category-card {
			height: 14vh;
			width: 26vw;
			border-radius: 15px !important;
		}
	}
</style>
