# CSS Galore package registry

Code is grouped by packages, every package has one or more modules.

```ts
interface Package {
  name: string;
  description: string;
  modules: Module[];
}

interface Module {
  name: string;
  description: string;
}
```

See [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to add more packages.
