FROM node:lts as builder

WORKDIR /app

COPY . .

RUN mv .env.production .env

RUN yarn install 

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install 

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

EXPOSE 4000

CMD [ "yarn", "start" ]