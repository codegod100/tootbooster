#!/bin/bash
chown -R person:person /home/person/.local
su - person
~/.local/bin/edgedb project init --non-interactive
npm run build
npx bun build/index.js