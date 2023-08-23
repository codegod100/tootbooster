import { PROJECT_URL, API_KEY, REDIRECT_URI } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { getApplication,insertApplication } from "$lib/queries/queries"
import {createClient} from "edgedb"

export async function load({ params, cookies }) {
  const client = createClient();
  const host = params.host;
  let app = await getApplication(client, {host})
  console.log(app)

  if (app) {
    cookies.set("client_id", app.client_id);
    cookies.set("client_secret", app.client_secret);
    throw redirect(
      307,
      `https://${host}/oauth/authorize?client_id=${app.client_id}&scope=read+write+push&redirect_uri=${REDIRECT_URI}/${host}&response_type=code&host=${host}`
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
  const item = await res.json();
  console.log({ item });

  app = await insertApplication(client, {host,client_id: item.client_id, client_secret: item.client_secret})
  console.log({app})
  throw redirect(
    307,
    `https://${host}/oauth/authorize?client_id=${item.client_id}&scope=read+write+push&redirect_uri=${REDIRECT_URI}/${host}&response_type=code&host=${host}`
  );
}
