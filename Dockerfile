FROM node:20-alpine

# Native dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy all source
COPY package*.json ./
COPY pnpm-workspace.yaml ./
COPY turbo.json ./
COPY packages/ ./packages/

# Install pnpm globally (pin version)
RUN npm install -g pnpm@9

# Install all deps (including devDeps for build)
RUN NODE_ENV=development pnpm install

# Build all packages
RUN NODE_ENV=development pnpm run build

# Re-install production only
RUN pnpm install --prod

# Expose port
EXPOSE 3000

# Health check (wget is available in alpine)
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=10 \
  CMD wget -q --spider http://localhost:3000/health || exit 1

# Start backend server
CMD ["node", "packages/backend/dist/index.js"]
