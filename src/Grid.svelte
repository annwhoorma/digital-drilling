<script>
	import { onMount } from 'svelte';
	import "aframe";
	// import 'aframe-event-set-component';
	import 'aframe-look-at-component';
	// import 'aframe-extras';

	export let goalPosition = {x: 0, y: 0, z: 0};
	let camera;
	let OxyDefault, OxyAdditional,
		OzyDefault, OzyAdditional,
		zeroDefault,
		yAxisDefault, yAxisAdditional;

	let gridSize = 10;
	const step = 2; // 1 step = scale meters
	const scale = 100;
	const gridColor = "#717171";

	AFRAME.registerComponent('grid-size-listener', {
		tick: function () {
			gridSize = -goalPosition.y;
		}
	});

	onMount(() => {
		console.log('hellou');
	});

	AFRAME.registerComponent('camera-listener', {
		tick: function () {
			let position = camera.object3D.position;
			if (position.z < 0 && OxyDefault.object3D.visible) {
				OxyDefault.object3D.visible = false;
				OxyAdditional.object3D.visible = true;
			}
			else if (position.z > gridSize*step-step && OxyAdditional.object3D.visible) {
				OxyDefault.object3D.visible = true;
				OxyAdditional.object3D.visible = false;
			}
			else if (position.x < 0 && OzyDefault.object3D.visible) {
				OzyDefault.object3D.visible = false;
				OzyAdditional.object3D.visible = true;
			}
			else if (position.x > gridSize*step-step && OzyAdditional.object3D.visible) {
				OzyDefault.object3D.visible = true;
				OzyAdditional.object3D.visible = false;
			}
			
			if (OxyAdditional.object3D.visible && OzyAdditional.object3D.visible) {
				zeroDefault.object3D.visible = false;
				yAxisDefault.object3D.visible = false;
				yAxisAdditional.object3D.visible = true;
			}
			else {
				zeroDefault.object3D.visible = true;
				yAxisDefault.object3D.visible = true;
				yAxisAdditional.object3D.visible = false;
			}
		}
	});

	AFRAME.registerComponent('goal-listener', {
		tick: function () {
			
		}
	})
</script>

<a-scene embedded>
	<a-assets>
		<!-- Mixin for displaying text -->
		<a-mixin id="text-fill" 
				 geometry="primitive: plane; width: auto; height: auto"
				 material="color: black; shader: flat; visible: false"
				 scale="20 20 20"
				 text="color: black; align: center"
				 look-at="#cam">
		</a-mixin>
	</a-assets>

	<!-- Create camera -->
	<a-entity >
		<a-camera bind:this={camera}
				  position="19 -10 19"
				  id="cam"
				  look-controls
				  wasd-controls>
		</a-camera>
	</a-entity>

	<!-- Create listeners -->
	<a-entity>
		<a-entity camera-listener={{}}/>
		<a-entity grid-size-listener={{}}/>
	</a-entity>

	<!-- Create light -->
	<a-entity light="type: ambient; color: #BBB"></a-entity>
	<a-entity light="type: directional; color: #FFF; intensity: 0.2" position="-0.5 1 1"></a-entity>

	<!-- Create grid -->
	<a-entity id="grid">
		<a-entity bind:this={zeroDefault} visible="true" mixin="text-fill" text="value: 0" position="0 0.5 0"></a-entity>

		<a-entity bind:this={yAxisDefault}>
			{#each Array(gridSize) as _, i}
				{#if i != 0 && i % 2 == 0}
					<a-entity mixin="text-fill" text="value: {-i*scale}" position="0.5 {-i*step} 0.5"></a-entity>
				{/if}
			{/each}
		</a-entity>

		<a-entity bind:this={yAxisAdditional}>
			{#each Array(gridSize) as _, i}
				{#if i != 0 && i % 2 == 0}
					<a-entity mixin="text-fill" text="value: {-i*scale}" position="{gridSize*step-2*step} {-i*step} {gridSize*step-2*step}"></a-entity>
				{/if}
			{/each}
		</a-entity>

		<!-- Oxy (default and additional) -->
		<a-entity bind:this={OxyDefault} visible="true">
			{#each Array(gridSize) as _, i}
				{#if i != 0 && i % 5 == 0}
					<a-entity mixin="text-fill" text="value: {-i*scale}" position="{i*step} 0.5 0"></a-entity>
				{/if}
				<a-entity line="start: {i*step} {-gridSize*step+step} 0; end: {i*step} 0 0; color: {gridColor}"></a-entity>
				<a-entity line="start: {gridSize*step-step} {-i*step} 0; end: 0 {-i*step} 0; color: {gridColor}"></a-entity>
			{/each}
		</a-entity>
		
		<a-entity bind:this={OxyAdditional} visible="false">
			{#each Array(gridSize) as _, i}
				{#if i % 5 == 0}
					<a-entity mixin="text-fill" text="value: {-i*scale}" position="{i*step} 0.5 {gridSize*step-step}"></a-entity>
				{/if}
				<a-entity line="start: {i*step} {-gridSize*step+step} {gridSize*step-step}; end: {i*step} 0 {gridSize*step-step}; color: {gridColor}"></a-entity>
				<a-entity line="start: {gridSize*step-step} {-i*step} {gridSize*step-step}; end: 0 {-i*step} {gridSize*step-step}; color: {gridColor}"></a-entity>
			{/each}
		</a-entity>

		<!-- Ozy (default and additional) -->
		<a-entity bind:this={OzyDefault} visible="true">
			{#each Array(gridSize) as _, i}
				{#if i != 0 && i % 5 == 0}
					<a-entity mixin="text-fill" text="value: {-i*scale}" position="0 0.5 {i*step}"></a-entity>
				{/if}
				<a-entity line="start: 0 {-gridSize*step+step} {i*step}; end: 0 0 {i*step}; color: {gridColor}"></a-entity>
				<a-entity line="start: 0 {-i*step} {gridSize*step-step}; end: 0 {-i*step} 0; color: {gridColor}"></a-entity>
			{/each}
		</a-entity>

		<a-entity bind:this={OzyAdditional} visible="false">
			{#each Array(gridSize) as _, i}
				{#if i % 5 == 0}
					<a-entity mixin="text-fill" text="value: {-i*scale}" position="{gridSize*step-step} 0.5 {i*step}"></a-entity>
				{/if}
				<a-entity line="start: {gridSize*step-step} {-gridSize*step+step} {i*step}; end: {gridSize*step-step} 0 {i*step}; color: {gridColor}"></a-entity>
				<a-entity line="start: {gridSize*step-step} {-i*step} {gridSize*step-step}; end: {gridSize*step-step} {-i*step} 0; color: {gridColor}"></a-entity>
			{/each}
		</a-entity>

		<!-- Oxz -->
		<a-entity>
			{#each Array(gridSize) as _, i}
				<a-entity line="start: {gridSize*step-step} {-gridSize*step+step} {i*step}; end: 0 {-gridSize*step+step} {i*step}; color: {gridColor}"></a-entity>
				<a-entity line="start: {i*step} {-gridSize*step+step} {gridSize*step-step}; end: {i*step} {-gridSize*step+step} 0; color: {gridColor}"></a-entity>
			{/each}
		</a-entity>

</a-scene>