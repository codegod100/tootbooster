FROM "debian"
WORKDIR "/workspace/tootbooster"
RUN apt update && apt install -y npm
RUN npm install -g bun
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY . .
ARG PORT=5173
ENV PORT=$PORT
RUN bunx --bun vite build
CMD ["bun","./build/index.js"]