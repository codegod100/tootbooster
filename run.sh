#!/bin/bash
~/.local/bin/edgedb instance create toot
npm run build
bun build/index.js