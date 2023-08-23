#!/bin/bash
~/.local/bin/edgedb instance create toot
npm run build
npx bun build/index.js