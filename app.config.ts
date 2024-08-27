import { defineConfig } from "@solidjs/start/config";
import UnoCSS from "unocss/vite";
import {
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { presetDaisy } from "@unscatty/unocss-preset-daisy";
import { presetExtra } from "unocss-preset-extra";

export default defineConfig({
  middleware: "./src/middleware.ts",
  vite: {
    plugins: [
      UnoCSS({
        content: {
          pipeline: {
            include: [/\.([jt]sx?|mdx?)($|\?)/],
          },
        },
        mergeSelectors: false,
        transformers: [transformerDirectives(), transformerVariantGroup()],
        presets: [
          presetUno(),
          presetDaisy({
            themes: [
              "light",
              "dark",
              "synthwave",
              "cyberpunk",
              "luxury",
              "coffee",
            ],
          }),
          presetTypography({
            cssExtend: {
              ":not(pre) > code::before,:not(pre) > code::after": {
                content: "",
              },
            },
          }),
          presetIcons(),
          presetExtra(),
        ],
        shortcuts: {},
      }),
    ],
  },
  server: {
    preset: "cloudflare-pages",
    rollupConfig: {
      external: ["node:async_hooks"]
    }
  }
});
