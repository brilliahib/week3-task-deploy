FROM node:20

RUN curl -fsSL https://bun.sh/install | bash && \
    mv /root/.bun/bin/bun /usr/local/bin

WORKDIR /app

COPY package.json bun.lock* ./

RUN bun install --dev

COPY . .

RUN bun prisma generate

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
