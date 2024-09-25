# CSS Galore package registry

Code is grouped by packages, every package can have several modules.

```js
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
```
