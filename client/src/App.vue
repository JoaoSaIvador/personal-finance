<template>
	<div id="app" class="content">
		<TopBar />
		<router-view />
	</div>
</template>

<script>
	import TopBar from "@/components/TopBar";

	export default {
		components: {
			TopBar,
		},
	};
</script>

<style>
	html,
	body,
	.content {
		background-color: rgb(238, 238, 238);
		height: 100%;
		width: 100%;
	}

	.primary-div {
		height: calc(100% - 56px);
		background-color: rgb(238, 238, 238);
	}

	.table-button {
		width: 30px;
		height: 30px;
		margin: 0 2px 0 2px;
	}

	.page-link {
		color: #343a40 !important;
	}

	.page-item.active .page-link {
		color: #ffffff !important;
		background-color: #343a40 !important;
		border: none !important;
	}
</style>
