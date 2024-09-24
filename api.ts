import { parseHTML } from "npm:linkedom@0.18.5";
import outdent from "https://deno.land/x/outdent@v0.8.0/mod.ts";

const patterns = Array.from(Deno.readDirSync("patterns")).map((file) =>
  file.name.replace(".html", "")
);

export default {
  fetch(request: Request): Response {
    const isJSON = request.headers.get("accept")?.includes("application/json");
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/") {
      const query = url.searchParams.get("q") || "";
      if (isJSON) {
        return Response.json(search(query));
      }
      return new Response(indexHTML(patterns), {
        headers: { "content-type": "text/html" },
      });
    }

    const pattern = get(path.replace("/", ""));

    if (!pattern) {
      return Response.json({}, { status: 404 });
    }

    if (isJSON) {
      return Response.json(pattern);
    }

    const html = Deno.readTextFileSync(`patterns/${pattern.name}.html`);
    return new Response(html, {
      headers: { "content-type": "text/html" },
    });
  },
};

function search(pattern: string): string[] {
  if (!pattern) return patterns;
  return patterns.filter((p) => p.includes(pattern));
}

function get(pattern: string): Pattern | undefined {
  if (!patterns.includes(pattern)) return;
  const content = Deno.readTextFileSync(`patterns/${pattern}.html`);
  return parse(pattern, content);
}

function parse(name: string, content: string): Pattern {
  const { document } = parseHTML(content);
  const description = content.match(/<!--([\s\S]+)-->/m)?.[1] || "";
  const el = document.querySelector("style");
  const style = el ? outdent.string(el.textContent.trim()) : "";
  return { name, description, content, style };
}

interface Pattern {
  name: string;
  description?: string;
  style: string;
  content: string;
}

function indexHTML(names: string[]): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Patterns</title>
</head>
<body>
  <h1>Patterns</h1>
  <ul>
    ${names.map((name) => `<li><a href="./${name}">${name}</a></li>`).join("")}
  </ul>
</body>
</html>
  `;
}
