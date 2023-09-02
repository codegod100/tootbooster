FROM alpine
RUN apk update && apk add bash nodejs npm
RUN npm install -g pnpm
WORKDIR "/workspace/tootbooster"
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN pnpm install
COPY . .

ENV PORT=5173



CMD ["./run.sh"]