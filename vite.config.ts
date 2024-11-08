/// <reference types="vitest" />

import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
	interface Future {
		v3_singleFetch: true;
	}
}

export default defineConfig({
	plugins: [
		!process.env.VITEST &&
			remix({
				future: {
					v3_fetcherPersist: true,
					v3_relativeSplatPath: true,
					v3_throwAbortReason: true,
					v3_singleFetch: true,
					v3_lazyRouteDiscovery: true,
				},
			}),
		tsconfigPaths(),
	],
	test: {
		environment: "happy-dom",
		globals: true,
		setupFiles: "./tests/setup.ts",
		resolveSnapshotPath: (testPath, snapExtension) =>
			testPath.replace(/\.test\.([tj]sx?)/, `${snapExtension}.$1`),
	},
});
