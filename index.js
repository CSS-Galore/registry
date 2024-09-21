let code = "<ul>\n";

for (const file of Deno.readDirSync("patterns")) {
  code += `<li><a href="patterns/${file.name}">${file.name}</a></li>\n`;
}

code += "</ul>";

Deno.writeTextFileSync("index.html", code);
