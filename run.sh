#!/bin/bash
echo $EDGEDB_DSN
npm run build
node build/index.js

