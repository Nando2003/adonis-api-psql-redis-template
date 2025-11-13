FROM node:22.13.1 AS build

WORKDIR /app

COPY . .

RUN npm install

FROM node:22.13.1 AS runtime

WORKDIR /app

COPY --from=build /app .

EXPOSE 3333

CMD ["npm", "run", "dev"]