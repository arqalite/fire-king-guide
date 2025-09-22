<h1 align="center"> The Fire King Sanctuary </h1>

<p align="center"><img src="src/assets/ponix_explode.gif" alt="Ponix explodes!" width="150"></p>

<p align="center">A free and open-source guide to <a href="https://yugipedia.com/wiki/Fire_King">Fire Kings</a> - by the community for the community.</p>

### Read the guide
The latest release of the guide is currently hosted at https://fire-king.arqalite.org/.

### Building the guide locally
You will need to install [mdBook] on your system - [more information can be found here].

Running `mdbook serve --open` should be all you need to do.

[mdBook]: https://rust-lang.github.io/mdBook/
[more information can be found here]: https://rust-lang.github.io/mdBook/guide/installation.html

### Contributing
Pull requests are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before starting any work, to make sure your changes align with the project standards.

If you have any questions regarding this guide, or would like to share feedback, please reach out in the `#guide-feedback` channel in the [Fire King Discord server].

### License

This work is licensed under <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-SA 4.0</a>.

### Credits
Every combo line, video and piece of content in this guide was created and validated by the Island Guides, part of the [Fire King Discord server] - [read the full list of contributors here].

[Fire King Discord server]: https://discord.gg/8JtxHUAdGq
[read the full list of contributors here]: https://fire-king.arqalite.org/credits.html


### Testing build banner

When building on the `testing` branch, the `vercel-build.sh` script generates a `theme/head.hbs` partial which injects a small banner in the sidebar indicating that the build is a testing version. Styles for this banner live in `theme/style.css` under the `.testing-banner` class.

Locally, you can simulate this behavior by running `scripts/serve-testing.sh`.
