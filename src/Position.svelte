<script>
    import { endPoint } from '../scripts/scene.js';
</script>

<div>
    <label>
        X
        <input type="number" bind:value={$endPoint.position.x} min="-100" max="100" step="0.1"/>
    </label>
    <label>
        Y
        <input type="number" bind:value={$endPoint.position.y} min="-100" max="100" step="0.1"/>
    </label>
    <label>
        Z
        <input type="number" bind:value={$endPoint.position.z} min="-100" max="100" step="0.1"/>
    </label>
</div>

<style>
    input {
        float: center;
        width: 60%;
    }
    div {
        margin: 1em 1em 1em 0em;
    }
</style>
