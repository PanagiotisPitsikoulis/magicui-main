import fs from "fs";
import path from "path";

interface Paths {
  componentDir: string;
  demoDir: string;
  magicuiDir: string;
  docsDir: string;
  registryUiFile: string;
  registryExamplesFile: string;
  docsConfigFile: string;
}

// Ensure the script is executed with an argument
const componentName = process.argv.slice(2).join(" ");

if (!componentName) {
  console.error("❌ Please provide a component name!");
  process.exit(1);
}

// Convert to lowercase for directory naming consistency
const componentNameLower = componentName.toLowerCase();
const componentNameCapitalized =
  componentName.charAt(0).toUpperCase() + componentName.slice(1);

// Define paths for component files
const paths: Paths = {
  componentDir: path.join("registry", "default", "magicui", componentNameLower),
  demoDir: path.join(
    "registry",
    "default",
    "example",
    `${componentNameLower}-demo.tsx`
  ),
  magicuiDir: path.join(
    "registry",
    "default",
    "magicui",
    `${componentNameLower}.tsx`
  ),
  docsDir: path.join(
    "content",
    "docs",
    "components",
    `${componentNameLower}.mdx`
  ),
  registryUiFile: path.join("registry", "registry-ui.ts"),
  registryExamplesFile: path.join("registry", "registry-examples.ts"),
  docsConfigFile: path.join("config", "docs.ts"),
};

/**
 * Deletes a file or directory recursively
 */
function deleteFileOrDir(filePath: string): void {
  if (fs.existsSync(filePath)) {
    if (fs.lstatSync(filePath).isDirectory()) {
      // Recursively delete directory contents
      fs.readdirSync(filePath).forEach((file) => {
        const currentPath = path.join(filePath, file);
        deleteFileOrDir(currentPath);
      });
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
    console.log(`✅ Deleted: ${filePath}`);
  } else {
    console.log(`❌ Not found: ${filePath}`);
  }
}

/**
 * Updates a registry file by removing the component object
 */
function updateRegistryFile(
  filePath: string,
  name: string,
  isExampleRegistry: boolean = false
): void {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Registry file not found: ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    const newLines: string[] = [];
    let skipLines = false;
    let braceCount = 0;
    let lastBraceIndex = -1;

    // Adjust the name pattern based on the registry type
    const searchName = isExampleRegistry ? `${name}-demo` : name;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check if this line contains the component we want to remove
      if (
        line.includes(`"name": "${searchName}"`) ||
        line.includes(`name: "${searchName}"`)
      ) {
        // Look backward to find the start of the object
        let j = i;
        while (j >= 0) {
          if (lines[j].trim().startsWith("{")) {
            lastBraceIndex = newLines.length - 1;
            braceCount = 1;
            skipLines = true;
            break;
          }
          j--;
        }
        continue;
      }

      if (skipLines) {
        braceCount += (line.match(/\{/g) || []).length;
        braceCount -= (line.match(/\}/g) || []).length;
        if (braceCount === 0) {
          skipLines = false;
          // Remove the standalone opening brace
          if (lastBraceIndex >= 0 && newLines[lastBraceIndex].trim() === "{") {
            newLines.splice(lastBraceIndex, 1);
          }
          // Skip the comma after the object if it exists
          if (i + 1 < lines.length && lines[i + 1].trim() === ",") {
            i++;
          }
        }
        continue;
      }

      newLines.push(lines[i]);
    }

    // Clean up the content
    let newContent =
      newLines
        .join("\n")
        .replace(/,(\s*\])/g, "$1") // Remove trailing comma before closing bracket
        .replace(/\{\s*,/g, "{") // Remove comma after opening brace
        .replace(/,\s*\}/g, "}") // Remove comma before closing brace
        .replace(/\n{3,}/g, "\n\n") // Remove excessive empty lines
        .replace(/{\s*}/g, "{}") // Clean up empty objects
        .trim() + "\n"; // Ensure file ends with newline

    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Updated registry file: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
  }
}

/**
 * Updates the docs config file by removing the component
 */
function updateDocsConfig(filePath: string, componentName: string): void {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Docs config file not found: ${filePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");
    const newLines: string[] = [];
    let skipLines = false;
    let braceCount = 0;
    let lastBraceIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check if this line contains the component title we want to remove
      if (
        line.includes(`title: "${componentNameCapitalized}"`) ||
        line.includes(`href: \`/docs/components/${componentNameLower}\``)
      ) {
        // Look backward to find the start of the object
        let j = i;
        while (j >= 0) {
          if (lines[j].trim().startsWith("{")) {
            lastBraceIndex = newLines.length - 1;
            braceCount = 1;
            skipLines = true;
            break;
          }
          j--;
        }
        continue;
      }

      if (skipLines) {
        braceCount += (line.match(/\{/g) || []).length;
        braceCount -= (line.match(/\}/g) || []).length;
        if (braceCount === 0) {
          skipLines = false;
          // Remove the standalone opening brace
          if (lastBraceIndex >= 0 && newLines[lastBraceIndex].trim() === "{") {
            newLines.splice(lastBraceIndex, 1);
          }
          // Skip the comma after the object if it exists
          if (i + 1 < lines.length && lines[i + 1].trim() === ",") {
            i++;
          }
        }
        continue;
      }

      newLines.push(lines[i]);
    }

    // Clean up the content
    let newContent =
      newLines
        .join("\n")
        .replace(/,(\s*\])/g, "$1") // Remove trailing comma before closing bracket
        .replace(/\{\s*,/g, "{") // Remove comma after opening brace
        .replace(/,\s*\}/g, "}") // Remove comma before closing brace
        .replace(/\n{3,}/g, "\n\n") // Remove excessive empty lines
        .replace(/{\s*}/g, "{}") // Clean up empty objects
        .trim() + "\n"; // Ensure file ends with newline

    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Updated docs config file: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error);
  }
}

// Execute the removal process
console.log(`🔄 Removing component: ${componentNameLower}`);

// Delete component files
const filesToDelete = [
  paths.componentDir,
  paths.demoDir,
  paths.magicuiDir,
  paths.docsDir,
];

filesToDelete.forEach((filePath) => {
  deleteFileOrDir(filePath);
});

// Update registry files and docs config
updateRegistryFile(paths.registryUiFile, componentNameLower, false);
updateRegistryFile(paths.registryExamplesFile, componentNameLower, true);
updateDocsConfig(paths.docsConfigFile, componentNameLower);

console.log("✨ Component removal complete!");
