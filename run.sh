#!/bin/bash
npm run build
chown -R person:person /home/person
sudo -u person ./build.sh
npx bun build/index.js
