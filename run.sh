#!/bin/bash
npm run build
~/.local/bin/edgedb project init --non-interactive
npx bun build/index.js

