#!/bin/sh

curl -Lo mdbook.tar.gz https://github.com/rust-lang/mdBook/releases/download/v0.4.43/mdbook-v0.4.43-x86_64-unknown-linux-musl.tar.gz;
tar -xvzf mdbook.tar.gz; 

sed -i "s#{VERSION}#$(git rev-parse --abbrev-ref HEAD)#g" theme/index.hbs
sed -i "s#{DATE}#$(printf '%(%Y-%m-%d)T\n' -1)#g" theme/index.hbs

./mdbook build