import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import { Router } from "@solidjs/router";
import { MetaProvider, Meta, Link, Title } from "@solidjs/meta";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Meta name="theme-color" content="#f6f8fa" />
          <Title>Alist Web</Title>
          <Nav />
          <Suspense>
            {props.children}
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
