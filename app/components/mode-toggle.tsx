import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

import { Button } from "~/components/ui/button";

export function ModeToggle() {
	const [theme, setTheme] = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)}
			aria-label={theme === Theme.LIGHT ? "Toggle dark mode" : "Toggle light mode"}
		>
			<Sun className="dark:-rotate-90 rotate-0 scale-100 transition-all dark:scale-0" />
			<Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
		</Button>
	);
}
