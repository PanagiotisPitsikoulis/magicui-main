import { Registry } from "@/registry/schema";

export const examples: Registry = [
  {
    name: "typography-demo",
    type: "registry:example",
    registryDependencies: ["typography"],
    files: ["/example/typography-demo.tsx"],
  },
  {
    name: "textbox-demo",
    type: "registry:example",
    registryDependencies: ["textbox"],
    files: ["/example/textbox-demo.tsx"],
  },
  {
    name: "animate-demo",
    type: "registry:example",
    registryDependencies: ["animate"],
    files: ["/example/animate-demo.tsx"],
  },
  {
    name: "background-demo",
    type: "registry:example",
    registryDependencies: ["background"],
    files: ["/example/background-demo.tsx"],
  },
];
