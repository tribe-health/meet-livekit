# Stage 1
FROM node:18-alpine AS deps
RUN apk update && apk add --no-cache libc6-compat git
WORKDIR /app
COPY package.json ./
RUN  yarn install

# Stage 2
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN NODE_ENV=production npm run build

# Stage 3
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env.production ./.env.production
USER 1001
EXPOSE 3000
ENV PORT 3000
CMD ["npm", "start"]
