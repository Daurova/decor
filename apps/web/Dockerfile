FROM node:20-alpine AS base
RUN npm install -g turbo
WORKDIR /app

# --- PRUNER ---
FROM base AS pruner
COPY . .
RUN turbo prune web --docker

# --- INSTALLER ---
FROM base AS installer
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install --no-audit --no-fund

# --- BUILDER ---
FROM installer AS builder
COPY --from=pruner /app/out/full/ .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
RUN npx turbo run build --filter=web...

# --- RUNNER (BigTech style) ---
FROM base AS runner
WORKDIR /app

# Не запускаем от root! Создаем пользователя nextjs
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем public
COPY --from=builder /app/apps/web/public ./apps/web/public

# Копируем standalone сервер (там уже есть нужные node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# Копируем статику
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

# Переключаемся на непривилегированного пользователя
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Запускаем напрямую server.js, без npm
CMD ["node", "apps/web/server.js"]