<template>
	<div
		class="container d-flex flex-column justify-content-center align-items-center"
		style="background-color: rgb(238, 238, 238)"
	>
		<div
			class="d-flex flex-row flex-wrap justify-content-center align-items-center"
		>
			<CategoryCard
				v-for="card in cards"
				:key="card.title"
				:card="card"
			/>
		</div>
		<div class="d-flex w-100 flex-row justify-content-center mb-5 px-3">
			<div class="d-flex flex-column mr-5">
				<TransactionList
					:transactions="transactions"
					@showModal="showModal"
					@removeTransaction="removeTransaction"
				/>
			</div>
			<div class="d-flex flex-column">
				<UserBalance />
				<CreateTransaction @createTransaction="createTransaction" />
			</div>
		</div>
		<TransactionModal
			v-show="isCreating"
			:transaction="transaction"
			@closeModal="isCreating = false"
			@updateTransaction="updateTransaction"
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
				transaction: {
					purpose: "",
					category: "",
					value: null,
				},
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
			createTransaction(transaction) {
				transaction.user = localStorage.getItem("authUser");

				axios
					.post(`http://localhost:4000/api/transactions`, {
						transaction: transaction,
					})
					.then((response) => {
						this.transactions.push(response.data.transaction);
					});
			},
			updateTransaction(transaction) {
				transaction.user = localStorage.getItem("authUser");

				axios
					.put(
						`http://localhost:4000/api/transactions/${transaction._id}`,
						{
							transaction: transaction,
						}
					)
					.then((response) => {
						this.isCreating = false;
					});
			},
			showModal(transaction) {
				this.transaction = transaction;
				this.isCreating = true;
			},
			removeTransaction(id, deletedCount) {
				if (deletedCount === 1) {
					this.transactions.splice(
						this.transactions.findIndex(
							(transaction) => transaction._id === id
						)
					);
				}
			},
		},
	};
</script>

<style scoped></style>
