FROM node:20-alpine

# python3/make/g++ better-sqlite3 native build icin.
# git/openssh admin yayinlama akisi (commit + push) icin.
# ttf-dejavu OG SVG -> PNG metin renderi icin (resvg-js loadSystemFonts).
RUN apk add --no-cache python3 make g++ git openssh-client ttf-dejavu

# Container root olarak calisiyor, host .git ubuntu (1001) sahipliginde.
# Git UID uyumsuzlugunda "dubious ownership" reddi yapar; admin publish
# akisi /app icinde calisir, oraya guven beyan ediyoruz.
RUN git config --global --add safe.directory /app

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["sh", "-c", "node src/migrate.js && node src/server.js"]
