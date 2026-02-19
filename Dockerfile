FROM node:current-alpine AS builder
COPY ./package.json  ./yarn.lock prisma.config.ts astro.config.mjs ./
COPY ./src ./public ./
RUN yarn install --immutable
RUN yarn build

FROM node:current-alpine AS deps
COPY ./package.json  ./yarn.lock ./
RUN yarn install --immutable --production && yarn cache clean

FROM node:current-alpine AS runner
WORKDIR /app
COPY ./package.json  ./yarn.lock prisma.config.ts astro.config.mjs ./
COPY --from=builder ./dist ./dist
COPY --from=deps ./node_modules ./node_modules
CMD ["node", "./dist/server/entry.mjs"]