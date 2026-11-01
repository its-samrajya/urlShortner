FROM oven/bun:alpine AS base
WORKDIR /app

RUN addgroup -g 1001 bunapp && adduser -D -u 1001 -G bunapp bunapp

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . . 

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

RUN bun run build

FROM node:22-alpine as runner

WORKDIR /app

RUN addgroup -g 1001 bunapp && adduser -D -u 1001 -G bunapp bunapp

ENV NODE_ENV=production 
ENV PORT=3000
EXPOSE 3000

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN chown -R bunapp:bunapp /app

USER bunapp

CMD ["node", "server.js"]