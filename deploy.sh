#!/bin/bash

set -e
source ~/.bash_profile

cp ~/.env.local .env.local
mkdir -p static
ln -s ~/uploads static/uploads

npx pnpm i -P
npx pnpm build
