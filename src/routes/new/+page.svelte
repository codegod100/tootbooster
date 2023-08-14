<script>
    export let data
    import { browser } from '$app/environment';
</script>

{#if data.user}
<div>{data.user}</div>
<form method="POST">
<textarea name="message">{data.message}</textarea>
<div><input type="submit" value="send message"> <input type="submit" name="logout" value="logout"></div></form>
{:else}
<form method="GET">
    <div>Enter mastodon/fediverse domain to log into</div>
    <input type="text" name="host">
    <input type="submit" value="login">
</form>
{/if}