FROM oven/bun:alpine AS deps
WORKDIR /app


COPY package.json bun.lock ./

RUN bun install --production --frozen-lockfile

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN addgroup -S bunapp && adduser -S bunapp -G bunapp
RUN chown -R bunapp:bunapp /app

USER bunapp

ENV NODE_ENV=production
ENV PORT=8000

EXPOSE 8000

CMD ["node", "index.ts"]
