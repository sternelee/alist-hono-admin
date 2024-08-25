import { createSignal } from "solid-js";
export default function Login() {
	const [isRegister, setIsRegister] = createSignal(false);
	const [name, setName] = createSignal("");
	const [email, setEmail] = createSignal("");
	const [password, setPassword] = createSignal("");
	const [error, setError] = createSignal("");
	const login = (isLogin = true) => {
		const body: Record<string, string> = {
			email: email(),
			password: password(),
		};
		if (!isLogin) {
			body.name = name();
		}
		if (isLogin) {
			fetch("/api/login", {
				method: "POST",
				body: JSON.stringify(body),
			});
		}
	};
	return (
		<div class="hero bg-base-200 min-h-screen">
			<div class="hero-content flex-col lg:flex-row-reverse">
				<div class="text-center lg:text-left">
					<h1 class="text-5xl font-bold">Login now!</h1>
					<p class="py-6">登陆管理你的Alist订阅.</p>
				</div>
				<div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
					<form class="card-body">
						<div class="form-control">
							<label class="label">
								<span class="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								class="input input-bordered"
								onInput={(e) => setEmail(e.currentTarget.value)}
								required
							/>
						</div>
						{isRegister() && (
							<div class="form-control">
								<label class="label">
									<span class="label-text">Name</span>
								</label>
								<input
									type="email"
									placeholder="Name"
									class="input input-bordered"
									onInput={(e) => setName(e.currentTarget.value)}
									required
								/>
							</div>
						)}
						<div class="form-control">
							<label class="label">
								<span class="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								class="input input-bordered"
								onInput={(e) => setPassword(e.currentTarget.value)}
								required
							/>
							<label class="label">
								<a href="#" class="label-text-alt link link-hover">
									Forgot password?
								</a>
							</label>
						</div>
						<div class="form-control mt-6">
							<button
								class="btn btn-primary mt-1"
								classList={{ "btn-disabled": !email() || !password() }}
								onClick={() => login()}
							>
								Login
							</button>
							<button
								class="btn btn-primary mt-1"
								classList={{
									"btn-disabled": !name() || !email() || !password(),
								}}
								onClick={() => {
									if (isRegister()) return login(false);
									return setIsRegister(true);
								}}
							>
								注册
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
