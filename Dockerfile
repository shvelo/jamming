# syntax=docker/dockerfile:1

FROM node:latest as builder

WORKDIR /app

COPY ["package.json", "package-lock.json*", "tsconfig.json", ".env", "./"]
RUN npm ci

COPY ./src ./src
RUN npm run build

FROM node:latest as runner

WORKDIR /app

COPY --from=builder /app /app

ENV NODE_ENV=production
CMD [ "npm", "run", "start" ]
