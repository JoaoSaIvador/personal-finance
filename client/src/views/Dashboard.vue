<template>
	<div
		class="primary-div container d-flex flex-column justify-content-center align-items-center"
	>
		<div class="d-flex flex-row">
			<CategoryCard
				v-for="card in cards"
				:key="card.title"
				:card="card"
			/>
		</div>
		<div class="d-flex w-100 flex-row justify-content-start mb-5">
			<div class="d-flex flex-column mr-5">
				<TransactionList
					:transactions="transactions"
					@showModal="showModal"
				/>
			</div>
			<div class="d-flex flex-column">
				<UserBalance />
				<CreateTransaction />
			</div>
		</div>
		<TransactionModal
			v-show="isCreating"
			@closeModal="isCreating = false"
			@confirm="confirm"
		/>
	</div>
</template>

<script>
	import axios from "axios/dist/axios";
	import TransactionList from "@/components/TransactionList";
	import CategoryCard from "@/components/CategoryCard";
	import TransactionModal from "@/components/TransactionModal";
	import UserBalance from "@/components/UserBalance";
	import CreateTransaction from "@/components/CreateTransaction";

	export default {
		name: "Dashboard",
		components: {
			TransactionList,
			CategoryCard,
			TransactionModal,
			UserBalance,
			CreateTransaction,
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
				transactions: [],
				isCreating: false,
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
						withCredentials: true,
						params: { user: user },
					})
					.then((response) => {
						this.transactions = response.data.transactions;
					});
			},
			confirm(transaction) {
				transaction.user = localStorage.getItem("authUser");

				axios
					.post(`http://localhost:4000/api/transactions/`, {
						transaction: transaction,
					})
					.then((response) => {
						this.transactions.push(response.data.transaction);
						this.isCreating = false;
					});
			},
			showModal() {
				this.isCreating = true;
			},
		},
	};
</script>

<style scoped></style>
