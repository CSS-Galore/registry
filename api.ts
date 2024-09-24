import { parseHTML } from "npm:linkedom@0.18.5";

const patterns = Array.from(Deno.readDirSync("patterns")).map((file) =>
  file.name.replace(".html", "")
);

export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/") {
      const query = url.searchParams.get("q") || "";
      return Response.json(search(query));
    }

    const pattern = get(path.replace("/", ""));

    if (!pattern) {
      return Response.json({}, { status: 404 });
    }

    return Response.json(pattern);
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
  const style = el ? el.textContent.trim() : "";
  return { name, description, content, style };
}

interface Pattern {
  name: string;
  description?: string;
  style: string;
  content: string;
}
