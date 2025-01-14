import { Registry } from "@/registry/schema";

export const ui: Registry = [
  {
    name: "typography",
    type: "registry:ui",
    files: ["magicui/typography.tsx"],
  },
  {
    name: "textbox",
    type: "registry:ui",
    files: ["magicui/textbox.tsx"],
  },
  {
    name: "animate",
    type: "registry:ui",
    files: ["magicui/animate.tsx"],
  },
  {
    name: "background",
    type: "registry:ui",
    files: ["magicui/background.tsx"],
  },
];
