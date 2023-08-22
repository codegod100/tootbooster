FROM "debian"
WORKDIR "/workspace/tootbooster"
RUN apt update && apt install -y npm
RUN npm install -g bun
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN bun install
COPY . .

ARG PORT=5173
ARG PROJECT_URL
ARG API_KEY
ARG REDIRECT_URI

ENV PORT=$PORT
ENV PROJECT_URL=$PROJECT_URL
ENV API_KEY=$API_KEY
ENV REDIRECT_URI=$REDIRECT_URI

RUN bunx --bun vite build
CMD ["bun","/workspace/tootbooster/build/index.js"]