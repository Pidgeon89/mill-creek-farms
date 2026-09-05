import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function routerBasepath() {
  const base = import.meta.env.BASE_URL || "/";
  const trimmed = base.replace(/\/$/, "");
  return trimmed === "" ? undefined : trimmed;
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    basepath: routerBasepath(),
  });
}
