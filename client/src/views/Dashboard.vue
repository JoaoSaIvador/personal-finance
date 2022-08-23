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
	import axios from "axios/dist/axios";
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
		created() {
			// User not authorized
			const token = localStorage.getItem("token");
			if (!token) {
				this.$router.push("/login");
			} else {
				// Validate Token
				axios
					.post("http://localhost:4000/api/user/verifyUser", {
						token: token,
					})
					.then((response) => {
						if (response.data.user) {
							localStorage.setItem(
								"authUser",
								response.data.user.email
							);

							this.getTransactions();
						} else {
							localStorage.clear();
							this.$router.push("login");
						}
					});
			}
		},
		methods: {
			getTransactions() {
				const user = localStorage.getItem("authUser");
				axios
					.get(`http://localhost:4000/api/transactions/`, {
						params: { user: user },
					})
					.then((response) => {
						console.log(response.data.transactions);
					});
			},
		},
	};
</script>

<style scoped></style>
