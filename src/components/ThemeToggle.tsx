import { usePrefersDark } from "@solid-primitives/media";
import { createEffect, createSignal, For } from "solid-js";
import { LocalStorageKey } from "~/types";

const themes = [
  "light",
  "dark",
  "synthwave",
  "cyberpunk",
  "luxury",
  "coffee",
];

const ThemeButton = (props: { name: string; theme: string; onClick: any }) => {
  return (
    <button
      class="outline-base-content text-start outline-offset-4"
      data-set-theme={props.name}
      onClick={props.onClick}
    >
      <span
        data-theme={props.name}
        class="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
      >
        <span class="grid grid-cols-5 grid-rows-3">
          <span class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              class={`h-3 w-3 shrink-0 ${
                props.theme !== props.name ? "invisible" : ""
              }`}
            >
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
            </svg>
            <span class="flex-grow text-sm">{props.name}</span>
            <span class="flex h-full shrink-0 flex-wrap gap-1">
              <span class="bg-primary rounded-badge w-2"></span>
              <span class="bg-secondary rounded-badge w-2"></span>
              <span class="bg-accent rounded-badge w-2"></span>
              <span class="bg-neutral rounded-badge w-2"></span>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
};

export default function ThemeToggle() {
  const [theme, setTheme] = createSignal("light");
  const [isAppearanceTransition, setIsAppearanceTransition] =
    createSignal(false);

  const prefersDark = usePrefersDark();

  function toggle(t: string) {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    const metaTag = document.querySelector(
      'meta[name="theme-color"]'
    ) as Element;
    const rootElement = document.documentElement;
    const computedStyle = window.getComputedStyle(rootElement);
    // hsl(var(--b1) / var(--un-bg-opacity, 1))
    const b1Color = computedStyle.getPropertyValue("--b1");
    // document.getElementsByClassName('flash-logo')[0].style.background = `hsl(${b1Color})`;
    const color = `hsl(${b1Color})`
    metaTag.setAttribute("content", color);
  }

  createEffect(() => {
    setIsAppearanceTransition(
      // @ts-expect-error: Transition API
      document.startViewTransition &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const t =
      localStorage.getItem(LocalStorageKey.THEME) ||
      (prefersDark() ? "dark" : "light");
    toggle(t);
  });

  function handleToggleTheme(t: string, event: MouseEvent) {
    localStorage.setItem(LocalStorageKey.THEME, t);

    if (!isAppearanceTransition() || !event) {
      toggle(t);
    } else {
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      );
      const transition = document
        // @ts-expect-error: Transition API
        .startViewTransition(async () => {
          toggle(t);
        });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 300,
            easing: "ease-in",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    }
  }

  return (
    <div title="Change Theme" class="ml-auto dropdown dropdown-end z-100">
      <div role="button" tabIndex={0} class="btn btn-ghost">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="h-5 w-5 stroke-current md:hidden"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          ></path>
        </svg>
        <span class="hidden font-normal md:inline">Theme</span>
      </div>
      <div
        tabIndex={0}
        class="dropdown-content bg-base-200 text-base-content rounded-box top-px h-[22rem] max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border border-white/5 shadow-2xl outline outline-1 outline-black/5 mt-14"
      >
        <div class="grid grid-cols-1 gap-3 p-3">
          <For each={themes}>
            {(t) => (
              <ThemeButton
                name={t}
                theme={theme()}
                onClick={(event: MouseEvent) => {
                  handleToggleTheme(t, event);
                }}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
