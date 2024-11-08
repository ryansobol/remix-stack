import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import clsx from "clsx";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";
import { ModeToggle } from "./components/mode-toggle";
import { themeSessionResolver } from "./sessions.server";
import styles from "./tailwind.css?url";

export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);

	return {
		theme: getTheme(),
	};
}

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	const data = useLoaderData<typeof loader>();

	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
			<Structure>{children}</Structure>
		</ThemeProvider>
	);
}

function Structure({ children }: { children: React.ReactNode }) {
	const data = useLoaderData<typeof loader>();
	const [theme] = useTheme();

	return (
		<html lang="en" className={clsx(theme)}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col border-x">
			<header className="sticky top-0 z-40 flex justify-end border-b p-1">
				<ModeToggle />
			</header>

			<main className="flex flex-1 flex-col items-center justify-center gap-16 px-1 py-8">
				<Outlet />
			</main>

			<footer className="inline-flex h-16 items-center justify-center border-t p-1">
				<p className="text-gray-500 text-sm">
					Made from{" "}
					<a
						className="text-blue-700 hover:underline dark:text-blue-500"
						href="https://github.com/ryansobol/remix-stack"
						target="_blank"
						rel="noreferrer"
					>
						ryansobol/remix-stack
					</a>
				</p>
			</footer>
		</div>
	);
}
