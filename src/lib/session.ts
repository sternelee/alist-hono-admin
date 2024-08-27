import { useSession } from "vinxi/http";
import { UserSession } from "~/types";

export function getSession() {
  return useSession<UserSession>({
    password: process.env.SESSION_SECRET as string,
  });
}


export async function getUser(): Promise<UserSession | null> {
  const session = await getSession();
  const user = session.data.user;
  if (!user) return null;

  return session.data;
}
