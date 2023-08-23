#!/bin/bash
echo $DBHOST
ping -c 1 $DBHOST
~/.local/bin/edgedb instance link --dsn edgedb://edgedb:$DBPASSWD@$DBHOST
npm run build
bun build/index.js