import { PROJECT_URL, API_KEY, REDIRECT_URI } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import {createClient} from "edgedb"
import { getApplication,getUser,insertUser } from "$lib/queries/queries"


export async function load({ url,  request, params,cookies }) {
    const client = createClient();
    const code = url.searchParams.get('code')
    const host = params.host
    let app = await getApplication(client, {host})
    const body = new FormData()
    body.append("client_id", app.client_id)
    body.append("client_secret", app.client_secret)
    body.append("redirect_uri", `${REDIRECT_URI}/${host}`)
    body.append("grant_type", "authorization_code")
    body.append("code", code)
    body.append("scope", "read write push")

    const res = await fetch(`https://${host}/oauth/token`, {
        method: "POST",
        body
    })
    const token = await res.json()

    let res2 = await fetch(`https://${host}/api/v1/accounts/verify_credentials`, {
        headers: { 'Authorization': `Bearer ${token.access_token}` }
    })
    const account = await res2.json()
    if (account.username) {
        const username = account.username
        const access_token = token.access_token
        cookies.set("access_token", access_token, {path: "/"})
        cookies.set("host", host, {path: "/"})
        let user = await getUser(client, {username, host})
        console.log({user})

        if (!user) {

            await insertUser(client, {username,access_token,host})
        }
        cookies.set("username", `${account.username}@${host}`, {path: "/"})
        console.log(cookies.get("username"))
    }
    throw redirect(307, "/new")
    return {
        code, user: `${account.username}@${host}`
    };
}