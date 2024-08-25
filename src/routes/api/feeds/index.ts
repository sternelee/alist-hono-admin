import type { APIEvent } from "@solidjs/start/server";
import { getSession } from "~/lib/session";
import { API } from "~/constant";

const handler = async ({ request }: APIEvent) => {
	const session = await getSession();
	const auth = session.data.token;
	const headers = {
		Authorization: `Bearer ${auth}`,
	};

	const newRequest = new Request(API + "/v1/api/feeds", {
		headers,
		method: request.method,
		body: request.body,
	});
	return await fetch(newRequest);
};

export const GET = handler;

export const POST = handler;
