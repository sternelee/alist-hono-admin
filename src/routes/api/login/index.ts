import { redirect } from "@solidjs/router";
import type { APIEvent } from "@solidjs/start/server";
import { getSession } from "~/lib/session";
import { API } from "~/constant";
import { UserSession } from "~/types";

// nzpvo6kytmccjjgadvo84mex646t4x8nmpffmg38

export async function POST({ request }: APIEvent) {
	const body = await request.json();
	console.log(body);
	if (body.name) {
		// 注册
		const resp = await fetch(`${API}/v1/auth/users/setup`, {
			method: request.method,
			body: JSON.stringify(body),
		}).then((res) => res.json());
		console.log(resp);
	}
	try {
		const res = await loginHandler(body);
		console.log(res);
		const session = await getSession();
		await session.update(
			(d: UserSession) =>
				(d = {
					token: res.bearer,
					...res.user,
				}),
		);
		return redirect("/admin");
	} catch (err) {
		console.log("1111:", err);
		return new Response(JSON.stringify(err), { status: 401 });
	}
}

const loginHandler = async (body) => {
	return await fetch(`${API}/v1/auth/login`, {
		method: "POST",
		body: JSON.stringify(body),
	}).then((res) => res.json());
};
