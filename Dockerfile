FROM node:20-alpine

# python3/make/g++ better-sqlite3 native build icin.
# git/openssh admin yayinlama akisi (commit + push) icin.
# ttf-dejavu OG SVG -> PNG metin renderi icin (resvg-js loadSystemFonts).
RUN apk add --no-cache python3 make g++ git openssh-client ttf-dejavu

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

RUN mkdir -p /app/data

EXPOSE 3000

CMD ["sh", "-c", "node src/migrate.js && node src/server.js"]
