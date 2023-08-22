import { createClient } from '@supabase/supabase-js'
import { PROJECT_URL, API_KEY, REDIRECT_URI } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import {locate} from "func-loc"
const supabase = createClient(PROJECT_URL, API_KEY)

async function getApp(host) {
    return await supabase
        .from('applications')
        .select()
        .order("created_at", { ascending: false })
        .eq("host", host)
        .limit(1)
        .single()
}

export async function load({ url,  request, params,cookies }) {
    const code = url.searchParams.get('code')
    const host = params.host
    let resp = await getApp(host)
    const body = new FormData()
    body.append("client_id", resp.data.client_id)
    body.append("client_secret", resp.data.client_secret)
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
        let resp = await supabase
            .from('users')
            .select()
            .order("created_at", { ascending: false })
            .eq("username", username)
            .eq("host", host)
            .limit(1)
            .single()

        console.log({resp})

        if (!resp.data) {

            let resp2 = await supabase
                .from('users')
                .insert({ username, access_token, host })
        }
        cookies.set("username", `${account.username}@${host}`, {path: "/"})
        // let loc = await locate(cookies.set)
        // console.log({loc})
        console.log(cookies.get("username"))
    }
    throw redirect(307, "/new")
    return {
        code, user: `${account.username}@${host}`
    };
}