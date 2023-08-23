#!/bin/bash
~/.local/bin/edgedb project init --non-interactive
npm run build
npx bun build/index.js