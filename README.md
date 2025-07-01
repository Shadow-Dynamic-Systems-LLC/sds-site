# sds-site
Static-ish website that we deploy to apollo

## Assets
- `sds-shield-glyph.svg`: yellow/orange shield glyph displayed on the hero section.

## Blog
Markdown posts live in the `posts/` directory. `blog.html` lists available posts
and each entry links to `post.html`, which renders the markdown using
[marked](https://github.com/markedjs/marked). Images referenced with relative
paths are resolved against the `assets/` folder.
