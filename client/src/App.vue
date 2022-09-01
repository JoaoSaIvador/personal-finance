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
		width: 100%;
		height: calc(100% - 56px);
		background-color: rgb(238, 238, 238);
	}

	.page-content {
		padding: 2.5em;
		border-radius: 20px;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 14px 28px,
			rgba(0, 0, 0, 0.05) 0px 10px 10px;
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
