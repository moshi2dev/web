import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "moshi2-dev",
    compatibilityDate: "2026-11-06",
    observability: {
      enabled: true,
    },
    assets: {
      notFoundHandling: "single-page-application",
    },
    domains: ["moshi2.dev"],
  },
});
