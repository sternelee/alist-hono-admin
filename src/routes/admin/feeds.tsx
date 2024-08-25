import { createResource } from "solid-js";

export default function About() {
	const [feeds] = createResource(async () => {
		try {
			const response = await fetch("/api/feeds");
			return (await response.json()) as any[];
		} catch (err) {
			console.log(err);
			return [];
		}
	});
	console.log("feeds:", feeds());
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
				<div class="flex-1"></div>
			</div>
		</main>
	);
}

function UserInfo(props) {
	const { user } = props;
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
