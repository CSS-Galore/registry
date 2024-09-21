let code = "<ul>";

for (const file of Deno.readDirSync("patterns")) {
  code += `<li><a href="patterns/${file.name}">${file.name}</a></li>`;
}

code += "</ul>";

Deno.writeTextFileSync("index.html", code);
