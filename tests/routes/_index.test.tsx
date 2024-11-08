import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import Component, { type Resource, loader } from "~/routes/_index";

describe("_index", () => {
	const resources: Resource[] = [
		{
			icon: "zap",
			href: "https://remix.run/start/quickstart",
			text: "Quick Start (5 min)",
		},
		{
			icon: "click",
			href: "https://remix.run/start/tutorial",
			text: "Tutorial (30 min)",
		},
		{
			icon: "atom",
			href: "https://remix.run/docs",
			text: "Remix Docs",
		},
		{
			icon: "discord",
			href: "https://rmx.as/discord",
			text: "Join Discord",
		},
	];

	const RemixStub = createRemixStub([
		{
			path: "/",
			Component,
			loader() {
				return { resources };
			},
		},
	]);

	it("loads resources", () => {
		const response = loader();

		expect(response).toStrictEqual({ resources });
	});

	it("renders a welcome message", async () => {
		render(<RemixStub />);

		await waitFor(() => {
			expect(screen.getByRole("heading").innerHTML).toMatchSnapshot();
		});
	});

	it("renders the resources list", async () => {
		render(<RemixStub />);

		await waitFor(() => {
			expect(screen.getByRole("list")).toMatchSnapshot();
		});
	});
});
