import { parseHTML } from "npm:linkedom@0.18.5";
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";

try {
  Deno.removeSync("dist", { recursive: true });
} catch {
  // Directory doesn't exist
}

Deno.mkdirSync("dist");

const patterns: Pattern[] = Array.from(Deno.readDirSync("patterns")).map(
  (file) => {
    const content = Deno.readTextFileSync(`patterns/${file.name}`);
    const name = file.name.replace(".html", "");
    // deno-lint-ignore no-explicit-any
    const { document } = parseHTML(content) as any;
    const description = content.match(/<!--([\s\S]+)-->/m)?.[1] || "";
    const el = document.querySelector("style");
    const css = el ? outdent.string(el.textContent) : "";
    Deno.writeTextFileSync(`dist/${name}.html`, content);

    return {
      name,
      description,
      css,
    };
  },
);

patterns.sort((a, b) => a.name.localeCompare(b.name));

Deno.writeTextFileSync("dist/api.json", JSON.stringify(patterns));

interface Pattern {
  name: string;
  description: string;
  css: string;
}
