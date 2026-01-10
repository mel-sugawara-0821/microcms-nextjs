# 依存関係のインストールステージ
FROM node:20-alpine AS deps
WORKDIR /app
COPY my-tech-blog/package.json my-tech-blog/package-lock.json* ./
RUN npm ci

# ビルドステージ
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY my-tech-blog/ .
RUN npm run build

# 本番用実行ステージ
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.jsのstandaloneモードの出力をコピー
# standaloneモードでは、.next/standaloneディレクトリ内に必要なファイルがすべて含まれている
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
