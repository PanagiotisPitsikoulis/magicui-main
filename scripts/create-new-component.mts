import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// Ensure the script is executed with an argument
const componentName = process.argv.slice(2).join(" ");

if (!componentName) {
  console.error("❌ Please provide a component name!");
  process.exit(1);
}

// Convert to lowercase for directory naming consistency, but use capital letter for React component
const componentNameLower = componentName.toLowerCase();
const componentNameCapitalized =
  componentName.charAt(0).toUpperCase() + componentName.slice(1);

// Define paths
const componentDir = path.join("registry", "default", "magicui");
const demoDir = path.join(
  "registry",
  "default",
  "example",
  `${componentNameLower}-demo.tsx`
);
const magicuiDir = path.join(
  "registry",
  "default",
  "magicui",
  `${componentNameLower}.tsx`
);
const docsDir = path.join(
  "content",
  "docs",
  "components",
  `${componentNameLower}.mdx`
);

console.log(componentDir);
console.log(demoDir);
console.log(magicuiDir);
console.log(docsDir);

const registryUiFile = path.join("registry", "registry-ui.ts");
const registryExamplesFile = path.join("registry", "registry-examples.ts");

// Create or update component files and folders
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

const componentContent = `import React from 'react';

export default function ${componentNameCapitalized}() {
  return (
    <div>
      This is your ${componentNameCapitalized} component.
    </div>
  );
}`;

if (!fs.existsSync(path.join(componentDir, `${componentNameLower}.tsx`))) {
  fs.writeFileSync(
    path.join(componentDir, `${componentNameLower}.tsx`),
    componentContent
  );
  console.log(`✅ Created new: ${componentNameLower}.tsx`);
} else {
  fs.writeFileSync(
    path.join(componentDir, `${componentNameLower}.tsx`),
    componentContent
  );
  console.log(`✅ Updated: ${componentNameLower}.tsx`);
}

runPrettier(path.join(componentDir, `${componentNameLower}.tsx`)); // Prettier formatting

const demoContent = `import ${componentNameCapitalized} from '@/registry/default/magicui/${componentNameLower}';

export default function ${componentNameCapitalized}Demo() {
  return (
    <div className="relative justify-center">
      <${componentNameCapitalized} />
    </div>
  );
}`;

if (!fs.existsSync(demoDir)) {
  fs.writeFileSync(demoDir, demoContent);
  console.log(`✅ Created new: ${componentNameLower}-demo.tsx`);
} else {
  fs.writeFileSync(demoDir, demoContent);
  console.log(`✅ Updated: ${componentNameLower}-demo.tsx`);
}

runPrettier(demoDir); // Prettier formatting

const docsContent = `---
title: ${componentNameCapitalized}
date: 2024-06-01
description: ${componentNameCapitalized} component for Magic UI
author: magicui
published: true
---

<ComponentPreview name="${componentNameLower}-demo" />

## Installation

<Tabs defaultValue="cli">
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">
    \`\`\`bash
    npx magicui-cli add ${componentNameLower}
    \`\`\`
  </TabsContent>
  <TabsContent value="manual">
    <Steps>
      <Step>Copy and paste the following code into your project.</Step>
      <ComponentSource name="${componentNameLower}" />
      <Step>Update the import paths to match your project setup.</Step>
    </Steps>
  </TabsContent>
</Tabs>

<ComponentSource name="${componentNameLower}" />

## Props

| Prop  | Type   | Description                | Default |
| ----- | ------ | -------------------------- | ------- |
| color | String | The color of the component | "blue"  |
`;

if (!fs.existsSync(docsDir)) {
  fs.writeFileSync(docsDir, docsContent);
  console.log(`✅ Created new: ${componentNameLower}.mdx`);
} else {
  fs.writeFileSync(docsDir, docsContent);
  console.log(`✅ Updated: ${componentNameLower}.mdx`);
}

runPrettier(docsDir); // Prettier formatting

// Ensure magicui.tsx is placed in the correct directory
const magicuiContent = `
export default function ${componentNameCapitalized}() {
  return (
    <div className="relative justify-center">
      ${componentNameCapitalized}
    </div>
  );
}`;

if (!fs.existsSync(magicuiDir)) {
  fs.writeFileSync(magicuiDir, magicuiContent);
  console.log(`✅ Created new: ${componentNameLower}.tsx (magicui)`);
} else {
  fs.writeFileSync(magicuiDir, magicuiContent);
  console.log(`✅ Updated: ${componentNameLower}.tsx (magicui)`);
}

runPrettier(magicuiDir); // Prettier formatting

// Update registry files
let registryUiContent = fs.readFileSync(registryUiFile, "utf-8");
let registryExamplesContent = fs.readFileSync(registryExamplesFile, "utf-8");

// Add new component to registry-ui if it does not exist
if (!registryUiContent.includes(componentNameLower)) {
  registryUiContent = registryUiContent.replace(
    "];",
    `  {
    name: "${componentNameLower}",
    type: "registry:ui",
    dependencies: ["lucide-react"],
    files: ["magicui/${componentNameLower}.tsx"],
  },
];`
  );
  fs.writeFileSync(registryUiFile, registryUiContent);
  console.log(`✅ Updated: registry-ui.ts`);
}

// Add new component to registry-examples if it does not exist
if (!registryExamplesContent.includes(`${componentNameLower}-demo`)) {
  registryExamplesContent = registryExamplesContent.replace(
    "];",
    `  {
    name: "${componentNameLower}-demo",
    type: "registry:example",
    registryDependencies: ["${componentNameLower}"],
    files: ["example/${componentNameLower}-demo.tsx"],
  },
];`
  );
  fs.writeFileSync(registryExamplesFile, registryExamplesContent);
  console.log(`✅ Updated: registry-examples.ts`);
}

console.log(
  `✅ ${componentNameCapitalized} component created/updated successfully!`
);

// Prettier formatting function
function runPrettier(filePath: string) {
  try {
    execSync(`npx prettier --write ${filePath}`, { stdio: "ignore" });
    console.log(`✅ Prettier formatted: ${filePath}`);
  } catch (error) {
    console.error(`❌ Failed to format ${filePath} with Prettier`);
  }
}
