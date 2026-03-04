FROM node:current-alpine AS builder
WORKDIR /app
COPY ./package.json  ./yarn.lock prisma.config.ts astro.config.mjs ./
RUN yarn install --frozen-lockfile
COPY src ./src
COPY public ./public
COPY tsconfig.json ./
RUN yarn build

FROM node:current-alpine AS deps
WORKDIR /app
COPY ./package.json  ./yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

FROM node:current-alpine AS runner
WORKDIR /app
COPY ./package.json  ./yarn.lock prisma.config.ts astro.config.mjs ./
COPY ./src/prisma ./src/prisma
COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
EXPOSE 4321
ENV HOST="0.0.0.0"
CMD ["node", "./dist/server/entry.mjs"]