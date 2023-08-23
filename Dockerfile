FROM node

WORKDIR "/workspace/tootbooster"
RUN npm install -g bun
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY . .

ENV PORT=5173



CMD ["./run.sh"]