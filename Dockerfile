# More Help from https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
FROM node:12-alpine

LABEL mantainer = Stephane Segning <segning.lambou@bayamsell.com>

ENV PORT 8080

WORKDIR /app

COPY ./ ./

ENTRYPOINT ["yarn", "serve:ssr"]
