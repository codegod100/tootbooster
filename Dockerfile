FROM ghcr.io/codegod100/bun:master
RUN apt install -y curl ping
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.edgedb.com | sh -s -- -y

WORKDIR "/workspace/tootbooster"
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY . .

ENV PORT=5173
ENV DBHOST=wacky-guitar



CMD ["./run.sh"]