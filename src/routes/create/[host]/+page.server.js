import { createClient } from "@supabase/supabase-js";
import { PROJECT_URL, API_KEY, REDIRECT_URI } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

const supabase = createClient(PROJECT_URL, API_KEY);

async function getApp(host) {
  return await supabase
    .from("applications")
    .select()
    .order("created_at", { ascending: false })
    .eq("host", host)
    .limit(1)
    .single();
}

export async function load({ params, cookies }) {
  const host = params.host;
  let resp = await getApp(host);

  console.log(resp.data);

  if (resp.data && resp.data.client_id) {
    cookies.set("client_id", resp.data.client_id);
    cookies.set("client_secret", resp.data.client_secret);
    throw redirect(
      307,
      `https://${host}/oauth/authorize?client_id=${resp.data.client_id}&scope=read+write+push&redirect_uri=${REDIRECT_URI}/${host}&response_type=code&host=${host}`
    );
  }

  const body = new FormData();
  body.append("client_name", "tootbooster");
  body.append("redirect_uris", `${REDIRECT_URI}/${host}`);
  body.append("scopes", "read write push");
  const url = `https://${host}/api/v1/apps`;
  console.log({ url });
  const res = await fetch(url, {
    method: "POST",
    body,
  });
  console.log("trying");
  console.log({ res });
  const item = await res.json();
  console.log("wat");
  console.log({ item });
  let resp2 = await supabase
    .from("applications")
    .insert({
      client_id: item.client_id,
      client_secret: item.client_secret,
      host,
    });
  console.log(resp2.error, resp2.statusText);
  throw redirect(
    307,
    `https://${host}/oauth/authorize?client_id=${item.client_id}&scope=read+write+push&redirect_uri=${REDIRECT_URI}/${host}&response_type=code&host=${host}`
  );
}
