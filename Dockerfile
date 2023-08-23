FROM ghcr.io/codegod100/bun:master
RUN apt install -y curl
RUN useradd -ms /bin/bash person
USER person
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.edgedb.com | sh -s -- -y
WORKDIR "/home/person/tootbooster"
RUN ls
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN npm install
COPY . .

ENV PORT=5173
ENV DBHOST=wacky-guitar



CMD ["./run.sh"]