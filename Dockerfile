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

# Strip devDependencies for production
RUN pnpm prune --prod

# Rebuild native modules for production
RUN pnpm rebuild better-sqlite3

# Expose port
EXPOSE 3000

# Start backend server
CMD ["node", "packages/backend/dist/index.js"]
