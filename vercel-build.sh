#!/bin/sh

curl -Lo mdbook.tar.gz https://github.com/rust-lang/mdBook/releases/download/v0.4.43/mdbook-v0.4.43-x86_64-unknown-linux-musl.tar.gz;
tar -xvzf mdbook.tar.gz;
./mdbook build