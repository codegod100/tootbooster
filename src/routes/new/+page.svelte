<script>
  export let data;
  export let form;
  import { browser } from "$app/environment";
  import { Input, Button, Spinner, Label, Textarea } from "flowbite-svelte";
  let loading = false;
</script>

{#if data.user}
  <div>{data.user}</div>
  <form id="submit" method="POST">
    <Textarea name="message" class="md:w-1/2">{data.message}</Textarea>
    <div>
      <!-- <input type="submit" value="send message" /> -->
      <Button type="submit" size="sm">send message</Button>
      <Button type="submit" size="sm" name="logout" value="logout"
        >logout</Button
      >
    </div>
  </form>
  {form?.response || ""}
{:else}
  <form id="login" method="GET">
    <Label for="host">Enter mastodon/fediverse domain to log into</Label>
    <div class="grid gap-6 md:grid-cols-2">
      <div>
        <Input type="text" name="host" id="host" size="sm" />
      </div>
      <div>
        <Button
          size="sm"
          type="submit"
          disabled={loading}
          on:click={(e) => {
            loading = true;
            e.currentTarget.form.submit();
          }}
        >
          {#if loading}
            <Spinner class="mr-3" size="4" />loading...
          {:else}
            login
          {/if}
        </Button>
      </div>
    </div>
  </form>
{/if}
