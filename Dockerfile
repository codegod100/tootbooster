FROM debian
RUN apt update && apt install -y npm curl
RUN npm install -g bun
RUN useradd -ms /bin/bash person
RUN mkdir -p /home/person/.local
RUN chown -R person /home/person/.local
USER person
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.edgedb.com | sh -s -- -y
WORKDIR "/home/person/tootbooster"
RUN ls
COPY package.json package.json
COPY bun.lockb bun.lockb
RUN npm install
COPY . .

ENV PORT=5173



CMD ["./run.sh"]