<script>
  export let data;
  export let form;
  import { browser } from "$app/environment";
</script>

{#if data.user}
  <div>{data.user}</div>
  <form method="POST">
    <textarea name="message">{data.message}</textarea>
    <div>
      <input type="submit" value="send message" />
      <input type="submit" name="logout" value="logout" />
    </div>
  </form>
  {form?.response || ""}
{:else}
  <form id="login" method="GET">
    <div>Enter mastodon/fediverse domain to log into</div>
    <input type="text" name="host" />
    <input type="submit" value="login" on:click={(e) => {
      e.currentTarget.disabled = true;
      document.getElementById("login").submit()
    }} />
  </form>
{/if}
