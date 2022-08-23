<template>
	<div
		class="page-content bg-light d-flex flex-column justify-content-start align-items-center"
	>
		<div
			class="w-100 d-flex flex-row justify-content-between align-items-center mb-3"
		>
			<div>
				<b-button variant="dark" to="/"> Create </b-button>
			</div>
			<div v-if="transactions.length > 0">
				<b-form-group style="margin: 0">
					<b-input-group size="sm">
						<b-form-input
							id="filter-input"
							v-model="filter"
							type="search"
							placeholder="Type to Search"
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
			bordered
			head-variant="dark"
			striped
			hover
			label-sort-asc=""
			label-sort-desc=""
			label-sort-clear=""
			small
			:current-page="currentPage"
			:per-page="perPage"
			:filter="filter"
			:sort-by.sync="sortBy"
			:sort-desc.sync="sortDesc"
			:items="transactions"
			:fields="fields"
		>
			<template v-slot:cell(actions)="row">
				<div class="d-flex flex-row justify-content-center">
					<b-button
						variant="outline-dark"
						class="table-button d-flex align-items-center justify-content-center"
						to="/"
					>
					</b-button>
					<b-button
						variant="outline-dark"
						class="table-button d-flex align-items-center justify-content-center"
					>
					</b-button>
				</div>
			</template>
		</b-table>
		<b-pagination
			v-if="transactions.length > 0"
			v-model="currentPage"
			:total-rows="transactions.length"
			:per-page="perPage"
			class="m-0"
		/>
	</div>
</template>

<script>
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
					},
					{
						key: "category",
						sortable: true,
					},
					{
						key: "value",
						sortable: true,
					},
					{
						key: "date",
						sortable: true,
					},
					{
						key: "actions",
						sortable: false,
					},
				],
				currentPage: 1,
				perPage: 15,
				sortDesc: false,
				filter: null,
				affectedLine: null,
				sortBy: "date",
			};
		},
		methods: {},
	};
</script>

<style scoped>
	.page-content {
		padding: 2.5em;
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
