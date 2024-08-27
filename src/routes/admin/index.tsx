import { cache, createAsync, redirect } from "@solidjs/router";
import { getUser } from "~/lib/session";
import { User } from "~/types";

const defaultUser = {
  name: "Alist user",
  email: "alist@leeapps.dev",
  userId: "123456",
};

const getUsers = cache(async () => {
  "use server";
  const user = await getUser();
  if (!user) throw redirect("/login");
  return user.user;
}, "user");

export default function About() {
  const user = createAsync(() => getUsers());
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-2xl text-sky-700 font-thin uppercase my-16">
        Alist 管理后台
      </h1>
      <div class="flex">
        <ul class="menu menu-md bg-base-200 rounded-box w-56">
          <li>
            <a class="active">我的</a>
          </li>
          <li>
            <a>更改</a>
          </li>
        </ul>
        <div class="flex-1">
          <UserInfo user={user()} />
        </div>
      </div>
    </main>
  );
}

function UserInfo(props: { user: User | undefined }) {
  const { user = defaultUser } = props;
  return (
    <div class="hero bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          class="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 class="text-5xl font-bold">个人信息</h1>
          <p class="py-6">{user.name}</p>
          <p class="py-6">{user.email}</p>
          <p class="py-6">{user.userId}</p>
        </div>
      </div>
    </div>
  );
}
