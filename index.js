let code = "<ul>\n";

const files = Array.from(Deno.readDirSync("patterns")).sort((a, b) =>
  a.name.localeCompare(b.name)
);
for (const file of files) {
  code += `<li><a href="patterns/${file.name}">${file.name}</a></li>\n`;
}

code += "</ul>";

Deno.writeTextFileSync("index.html", code);
