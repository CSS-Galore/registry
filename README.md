# CSS Galore package registry

Code is grouped by packages, every package can have several modules.

```ts
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
}
```

See [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to add more packages.
