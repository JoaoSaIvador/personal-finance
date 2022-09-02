<template>
	<div
		class="page-content bg-light d-flex flex-column justify-content-between align-items-center"
	>
		<div
			class="bg-light w-100 d-flex flex-column justify-content-start align-items-center"
		>
			<div
				class="w-100 d-flex flex-row justify-content-start align-items-center mb-3"
			>
				<div v-if="transactions.length > 0">
					<b-form-group style="margin: 0">
						<b-input-group size="sm">
							<b-form-input
								id="filter-input"
								v-model="filter"
								type="search"
								placeholder="Type to Search"
								style="max-width: 170px"
							></b-form-input>

							<b-input-group-append>
								<b-button
									variant="dark"
									:disabled="!filter"
									@click="filter = ''"
									>Clear</b-button
								>
							</b-input-group-append>
						</b-input-group>
					</b-form-group>
				</div>
			</div>

			<b-table
				v-if="transactions.length > 0"
				class="scroll text-center"
				borderless
				sort-icon-left
				label-sort-asc=""
				label-sort-desc=""
				label-sort-clear=""
				small
				responsive
				sticky-header
				head-variant="light"
				:filter="filter"
				:sort-by.sync="sortBy"
				:sort-desc.sync="sortDesc"
				:sort-direction="sortDirection"
				:items="transactions"
				:fields="fields"
			>
				<template v-slot:cell(actions)="row">
					<div class="d-flex flex-row justify-content-center">
						<a
							@click="$emit('showModal', row.item)"
							class="actionButton d-flex align-items-center justify-content-center mr-2"
						>
							<font-awesome-icon icon="fa-solid fa-pencil" />
						</a>
						<a
							@click="deleteTransaction(row.item)"
							class="actionButton d-flex align-items-center justify-content-center"
						>
							<font-awesome-icon icon="fa-solid fa-trash-can" />
						</a>
					</div>
				</template>
			</b-table>
		</div>
	</div>
</template>

<script>
	import axios from "axios/dist/axios";

	export default {
		name: "TransactionList",
		props: {
			transactions: Array,
		},
		data() {
			return {
				fields: [
					{
						key: "purpose",
						sortable: true,
						thClass: "bg-light",
					},
					{
						key: "category",
						sortable: true,
						thClass: "bg-light",
					},
					{
						key: "value",
						sortable: true,
						thClass: "bg-light",
					},
					{
						key: "date",
						sortable: true,
						thClass: "bg-light",
					},
					{
						key: "actions",
						sortable: false,
						thClass: "bg-light",
					},
				],
				currentPage: 1,
				perPage: 13,
				sortDesc: true,
				sortDirection: "asc",
				filter: null,
				affectedLine: null,
				sortBy: "createdAt",
			};
		},
		methods: {
			deleteTransaction(transaction) {
				axios
					.delete(
						`http://localhost:4000/api/transactions/${transaction._id}`
					)
					.then((response) => {
						this.$emit(
							"removeTransaction",
							transaction._id,
							response.data.deletedCount
						);
					});
			},
		},
	};
</script>

<style scoped>
	@media screen and (max-width: 1200px) and (min-width: 501px) {
		.page-content {
			width: 50vw;
			height: 80vh;
			margin-top: 3em;
		}
	}

	@media screen and (min-width: 1201px) {
		.page-content {
			width: 670px;
			height: 750px;
		}
	}

	@media screen and (max-width: 500px) {
		.page-content {
			width: 80vw;
			height: 60vh;
		}
	}

	.actionButton {
		width: 28px;
		height: 28px;
		color: #343a40;
	}

	.actionButton:hover {
		background-color: #343a40;
		border-radius: 50%;
		color: white;
	}

	.scroll {
		max-height: 608px;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.scroll::-webkit-scrollbar-track {
		box-shadow: inset 0 0 16px 16px transparent;
		border: solid 6px transparent;
	}

	.scroll::-webkit-scrollbar {
		width: 16px;
	}

	.scroll::-webkit-scrollbar-thumb {
		box-shadow: inset 0 0 16px 16px #343a40;
		border: solid 6px transparent;
		border-radius: 16px;
	}
</style>
