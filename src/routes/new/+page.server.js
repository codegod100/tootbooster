import { redirect } from '@sveltejs/kit';
export async function load({ fetch, params, url, cookies }) {
	let sm = url.searchParams.get('message')

	if (sm) {
		console.log("setting message")
		cookies.set("message", sm, { path: "/" })
	}
	sm = cookies.get("message")
	const host = url.searchParams.get("host")
	if (host) {
		throw redirect(307, `/create/${host}`)
	}
	return { message: sm || "", user: cookies.get("username") }
}

export const actions = {
	default: async ({ request, cookies }) => {
		console.log("action")
		const data = await request.formData()

		const message = data.get("message")

		const logout = data.get('logout')
		if (logout) {
			console.log("logging out")
			cookies.set("username", "", { path: "/" })
			return {}
		}
		const body = new FormData()
		let access_token = cookies.get("access_token")
		body.append("status", message)
		console.log({ access_token })
		let host = cookies.get("host")
		fetch(`https://${host}/api/v1/statuses`, {
			method: "POST",
			body,
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		})

	}
};