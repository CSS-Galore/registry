# Contributing Guide

## How to contribute

This is a collaborative effort. We welcome all contributions submitted as pull
requests.

### Add new packages

Packages are in the `packages` folder. Every folder is a package and the name
should consist only in letters, numbers and hyphens.

Packages must have a `README.md` file with the description and other interesting
info.

Every package must have one or more modules. Modules are `.html` files with the
followign structure:

```html
<!--
Comment with the module description in markdown format
-->

<p>HTML elements for the demo</p>

<style>
  .host {
    /* User settings */
    ...
    /* Implementation */
    ...
  }
</style>

<style>
  /* Additional styles only for the demo */
</style>
```

- Except cases where you need to define global styles, (like normalizers and
  resets), all styles should be inside the `.host` class, using CSS nesting.
- If your module is configurable using CSS custom properties, they must be at
  the beginning under the `/* User settings */` comment. The rest of the code is
  below under the `/* Implementation */` comment.