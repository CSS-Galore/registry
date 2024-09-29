# CSS Galore package registry

> [!warning]
>
> This is a highly experimental project, and a lot of changes are expected.

Writing high quality CSS is not easy. And not because CSS is a complicated
language (it's not easy either), but due the lack of something other languages
have: **a registry of reusable packages**. While JavaScript has NPM, PHP has
Packagist, Rust has Crates, or Python has PyPI, in CSS you have to copy and
paste code from blog posts, Stack Overflow, or your personal collection of
snippets.

You can use a CSS framework like Tailwind or Bootstrap, but if you want to
create something unique, you may have to write all the styles from scratch or
reuse code from previous projects. Imagine that JavaScript, Rust, or Go
developers couldn't import packages and they had to implement everything by
themselves? Well, that's what happens with CSS.

**CSS Galore** is the missing code repository for CSS. It was created by
[Óscar Otero](https://oscarotero.com) as an experiemental project.

## How it works?

The idea is not to build a yet-another website with a collection of snippets,
but the missing "NPM for CSS". The most important part is the platform to
distribute the packages.

For example, many CSS-only packages are not easy to install, i.e. normalize.css,
animate.css, etc. These packages are available in NPM but NPM wasn't created for
CSS.

CSS Galore is not like the typical package manager where the imported code is
stored in a separate directory (say `css_modules`) and cannot be modified but
updated using semantic versions. This model is too rigid for CSS, which requires
much more flexibility and adaptability and the use of complex tooling because
there isn't a native mechanism to import/export CSS modules. It could also cause
some troubles like conflicts of class names, breaking changes after updating
dependencies, etc. That's why in CSS Galore, the code is added directly to your
CSS file and becomes part of your code, so you can edit it to adapt to your
needs. This reduce the complexity and ensure stability.

The way to submit packages is through PR to this repository, because it's easy
and it's not centralized (the repo can be forked at any time). This model works
fine for other big projects like
[Homebrew](https://github.com/Homebrew/homebrew-core).

See [CONTRIBUTING.md](CONTRIBUTING.md) to learn how to contribute with this
project.
