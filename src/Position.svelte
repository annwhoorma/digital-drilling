<script>
    export let goalPosition = {x: 0, y: 0, z: 0};
</script>

<div>
    <label>
        X
        <input bind:value={goalPosition.x} type="number" min="-5000" max="0" step="5"/>
    </label>
    <label>
        Y
        <input bind:value={goalPosition.y} type="number" min="-5000" max="0" step="5"/>
    </label>
    <label>
        Z
        <input bind:value={goalPosition.z} type="number"  min="-5000" max="0" step="5"/>
    </label>
</div>

<style>
    input {
        float: center;
        width: 5em;
    }
    div {
        margin: 1em 1em 1em 0em;
    }
</style>
