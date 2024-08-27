import { action, useSubmission } from "@solidjs/router";
import { getSession } from "~/lib/session";
import { FeedsResp, ErrResp } from "~/types";

const getAction = action(async () => {
  "use server";
  const session = await getSession();
  const bearer = session.data.bearer;
  const headers = {
    Authorization: `Bearer ${bearer}`,
  };
  const resp = (await fetch(`${process.env.BASE_URL}/v1/api/feeds`, {
    headers,
  }).then((res) => res.json())) as FeedsResp & ErrResp;
  console.log(resp);
  return resp;
});

export default function About() {
  const feedsResp = useSubmission(getAction);
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-2xl text-sky-700 font-thin uppercase my-16">
        订阅管理
      </h1>
      <div class="flex">
        <ul class="menu menu-md bg-base-200 rounded-box w-56">
          <li>
            <a class="active">订阅列表</a>
          </li>
          <li>
            <a>添加订阅</a>
          </li>
        </ul>
        <div class="flex-1">
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>标题</th>
                  <th>链接</th>
                  <th>设备</th>
                  <th>目录</th>
                  <th>创建时间</th>
                </tr>
              </thead>
              <tbody>
                {feedsResp.result?.data.map((feed, index) => (
                  <tr class="hover">
                    <th>{index + 1}</th>
                    <td>{feed.title}</td>
                    <td>{feed.url}</td>
                    <td>{feed.driver}</td>
                    <td>{feed.folderName}</td>
                    <td>{new Date(feed.createdOn).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AddForm />
        </div>
      </div>
    </main>
  );
}

const postAction = action(async (formData: FormData) => {
  "use server";
  const body = {};
  formData.forEach((value, key) => (body[key] = value));
  const session = await getSession();
  const bearer = session.data.bearer;
  const headers = {
    Authorization: `Bearer ${bearer}`,
  };
  const resp = (await fetch(`${process.env.BASE_URL}/v1/api/feeds`, {
    method: "POST",
    headers,
  }).then((res) => res.json())) as FeedsResp & ErrResp;
  console.log(resp);
  return resp;
});

const AddForm = () => {
  return (
    <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form class="card-body" action={postAction} method="post">
        <div class="form-control">
          <label class="label">
            <span class="label-text">标题</span>
          </label>
          <input
            type="text"
            placeholder="title"
            name="title"
            class="input input-bordered"
            required
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">链接</span>
          </label>
          <input
            type="text"
            placeholder="链接"
            name="url"
            class="input input-bordered"
            required
          />
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div class="form-control mt-6">
          <input type="submit" class="btn btn-primary">
            添加
          </input>
        </div>
      </form>
    </div>
  );
};
