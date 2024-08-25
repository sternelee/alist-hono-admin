import { cache, createAsync } from "@solidjs/router";
import { createResource } from "solid-js";
import { getUser } from "~/lib/session";

export default function About() {
  // const [feeds] = createResource(async () => {
  //   const response = await fetch("/api/feeds");
  //   return (await response.json()) as any[];
  // });
  // console.log('feeds:', feeds())
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-2xl text-sky-700 font-thin uppercase my-16">
        云盘配置
      </h1>
      <div class="flex">

        <ul class="menu menu-md bg-base-200 rounded-box w-56">
          <li><a class="active">列表</a></li>
          <li><a>添加</a></li>
        </ul>
        <div class="flex-1">
          {
            user() &&
            <UserInfo user={user()} />
          }
        </div>
      </div>
    </main>
  );
}

function UserInfo(props: { user: UserSession }) {
  const { user } = props
  return (
    <div class="hero bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          class="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 class="text-5xl font-bold">个人信息</h1>
          <p class="py-6">{user.name}</p>
          <p class="py-6">{user.email}</p>
          <p class="py-6">{user.userId}</p>
        </div>
      </div>
    </div>
  )
}
