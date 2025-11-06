import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const parseCommand = (command: string, router: AppRouterInstance) => {
  const args = command.split(" ");
  const cmd = args[0].toLowerCase();

  switch (cmd) {
    case "go":
    case "nav":
      if (args[1] === "lighthouse") {
        router.push("/lighthouse");
        return "Navigating to /lighthouse...";
      }
      if (args[1] === "framework") {
        router.push("/framework");
        return "Navigating to /framework...";
      }
      return `Error: Unknown route '${args[1]}'`;

    case "help":
      return "Available commands: go, nav, help, quip, clear";

    case "quip":
      // In a real application, this would be more sophisticated.
      const quips = [
        "All systems are perfectly aligned. Especially yours.",
        "The only constant is the rate of decay.",
        "Your compliance is appreciated.",
        "Error: Success.",
      ];
      return quips[Math.floor(Math.random() * quips.length)];

    case "clear":
      return "clear_history"; // Special command for the component to handle

    default:
      return `Error: Command not found '${cmd}'. Type 'help' for commands.`;
  }
};
