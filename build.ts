// deno-lint-ignore-file no-explicit-any
import { parseHTML } from "npm:linkedom@0.18.5";
import { parse } from "jsr:@std/yaml@1.0.5/parse";
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

  const packageInfo = parse(
    Deno.readTextFileSync(`${packageDir}/package.yaml`),
  ) as any;

  const info: Package = {
    name: dir.name,
    ...packageInfo,
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
    const description = content.match(/<!--([\s\S]+)-->/m)?.[1] || "";

    const el = document.querySelector("style");
    const css = el ? outdent.string(el.textContent) : "";

    try {
      Deno.mkdirSync(`dist/${info.name}`, { recursive: true });
    } catch {
      // Directory already exists
    }

    Deno.writeTextFileSync(`dist/${info.name}/${name}.html`, content);

    info.modules.push({
      name,
      description,
      css,
    });
  }

  info.modules.sort((a, b) => a.name.localeCompare(b.name));
}

packages.sort((a, b) => a.name.localeCompare(b.name));

Deno.writeTextFileSync("dist/api.json", JSON.stringify(packages));

interface Package {
  name: string;
  description: string;
  author: Author | Author[];
  modules: Module[];
}

interface Author {
  name: string;
  url: string;
}

interface Module {
  name: string;
  description: string;
  css: string;
}
