<script>
	import Grid from './Grid.svelte';
	import Position from './Position.svelte';

	let goalPosition = {x: -2, y: -2, z: -2};
</script>


<div class="left-menu">
	<Position bind:goalPosition={goalPosition}/>
</div>
<div class="scene">
	<Grid bind:goalPosition={goalPosition}/>
</div>


<style>
	.scene {
		z-index: 1;
		display: block;
		float: right;
		width: 85em;
		height: 45em;
	}
	.left-menu {
		z-index: 100;
		display: block;
		position: absolute;
	}
</style>

