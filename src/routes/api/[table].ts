import type { APIEvent } from "@solidjs/start/server";
import { getSession } from '~/lib/session';
import { API } from "~/constant";

const handler = async ({ request, params }: APIEvent) => {
  const table = params.table;
  console.log(table);
  const session = await getSession();
  const auth = session.data.token;
  const url = new URL(request.url);
  console.log(request.url)
  url.host = "api-alist.leeapps.dev";
  console.log(url)

  const headers = {
    "Authorization": `Bearer ${auth}`,
  }

  const newRequest = new Request(url.toString(), {
    headers,
    method: request.method,
    body: request.body,
    redirect: "follow",
  });
  return await fetch(newRequest);
}

export const GET = handler;

export const POST = handler;
