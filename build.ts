// deno-lint-ignore-file no-explicit-any
import { parseHTML } from "npm:linkedom@0.18.5";
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";

try {
  Deno.removeSync("dist", { recursive: true });
} catch {
  // Directory doesn't exist
}

Deno.mkdirSync("dist");

const packages: Package[] = [];
const baseDir = "packages";

for (const dir of Deno.readDirSync(baseDir)) {
  if (dir.isDirectory === false) {
    continue;
  }
  const packageDir = `${baseDir}/${dir.name}`;
  const description = Deno.readTextFileSync(`${packageDir}/README.md`).trim();

  const info: Package = {
    name: dir.name,
    description,
    modules: [],
  };

  packages.push(info);

  for (const file of Deno.readDirSync(packageDir)) {
    if (!file.name.endsWith(".html")) {
      continue;
    }

    const moduleFile = `${packageDir}/${file.name}`;
    const content = Deno.readTextFileSync(moduleFile);
    const name = file.name.replace(".html", "");

    const { document } = parseHTML(content) as any;
    const description = (content.match(/<!--([\s\S]+)-->/m)?.[1] || "").trim();

    const el = document.querySelector("style");
    const css = el ? outdent.string(el.textContent) : "";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `./${name}.css`;
    el.replaceWith(link);
    document.querySelectorAll("style").forEach((el: any) => {
      el.removeAttribute("demo");
    });

    try {
      Deno.mkdirSync(`dist/${info.name}`, { recursive: true });
    } catch {
      // Directory already exists
    }

    // Export the code
    Deno.writeTextFileSync(
      `dist/${info.name}/${name}.html`,
      document.toString(),
    );
    Deno.writeTextFileSync(`dist/${info.name}/${name}.css`, css);

    info.modules.push({
      name,
      description,
    });
  }

  info.modules.sort((a, b) => a.name.localeCompare(b.name));
}

packages.sort((a, b) => a.name.localeCompare(b.name));

Deno.writeTextFileSync("dist/api.json", JSON.stringify(packages));

interface Package {
  name: string;
  description: string;
  modules: Module[];
}

interface Module {
  name: string;
  description: string;
}
