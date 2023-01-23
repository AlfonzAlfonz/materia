#!/bin/bash

set -e
source ~/.bash_profile

cp ~/.env.local .env.local
mkdir -p public
ln -s ~/uploads public/uploads

npx pnpm i -P
npx pnpm build
