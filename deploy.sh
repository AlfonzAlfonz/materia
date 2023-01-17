#!/bin/bash

set -e
source ~/.bash_profile

cp ~/.env.local .env.local
mkdir static
ln -s ~/uploads static/uploads

npx pnpm i
npx pnpm next build
