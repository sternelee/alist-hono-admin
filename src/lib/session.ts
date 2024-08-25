import { useSession } from "vinxi/http";
import { UserSession } from "~/types";

export function getSession() {
  return useSession({
    password: process.env.SESSION_SECRET as string,
  });
}


export async function getUser(): Promise<UserSession | null> {
  const session = await getSession();
  const userId = session.data.userId;
  if (!userId) return null;

  return session.data;
}
