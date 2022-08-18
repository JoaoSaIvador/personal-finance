<template>
	<div
		class="primary-div container d-flex flex-row flex-wrap justify-content-center align-items-center"
	>
		<div class="d-flex flex-column">
			<TransactionList />
		</div>
		<div class="d-flex flex-column">
			<CategoryCard
				v-for="card in cards"
				:key="card.title"
				:card="card"
			/>
		</div>
	</div>
</template>

<script>
	import TransactionList from "@/components/TransactionList";
	import CategoryCard from "@/components/CategoryCard";

	export default {
		name: "Dashboard",
		components: {
			TransactionList,
			CategoryCard,
		},
		data() {
			return {
				cards: [
					{
						title: "Shopping",
						total: "EUR 35,00",
					},
					{
						title: "Food & Drinks",
						total: "EUR 18,50",
					},
					{
						title: "Bills & Utilities",
						total: "EUR 109,90",
					},
					{
						title: "Others",
						total: "EUR 252,90",
					},
				],
			};
		},
	};
</script>

<style scoped></style>
