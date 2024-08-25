import { useLocation } from "@solidjs/router";
import { createMemo } from "solid-js";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
	const location = useLocation();
	const active = (path: string) =>
		path == location.pathname
			? "border-sky-600"
			: "border-transparent hover:border-sky-600";
	const isAdmin = createMemo(() => location.pathname.startsWith("/admin"));
	return (
		<nav class="flex bg-sky-800">
			<ul class="container flex items-center p-3 text-gray-200">
				{isAdmin() && (
					<>
						<li class={`border-b-2 ${active("/admin")} mx-1.5 sm:mx-6`}>
							<a href="/">个人中心</a>
						</li>
						<li class={`border-b-2 ${active("/admin/drivers")} mx-1.5 sm:mx-6`}>
							<a href="/admin/drivers">设备管理</a>
						</li>
						<li class={`border-b-2 ${active("/admin/feeds")} mx-1.5 sm:mx-6`}>
							<a href="/admin/feeds">RSS订阅</a>
						</li>
					</>
				)}
				{!isAdmin() && (
					<>
						<li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
							<a href="/">Home</a>
						</li>
						<li class={`border-b-2 ${active("/login")} mx-1.5 sm:mx-6`}>
							<a href="/login">Login</a>
						</li>
					</>
				)}
			</ul>
			<ThemeToggle />
		</nav>
	);
}
