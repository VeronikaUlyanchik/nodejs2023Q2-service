FROM node:18.4.0-alpine
WORKDIR /src
COPY ["./package*.json", "./.eslintrc.js", "./tsconfig.json", "/src/"]
RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "dist/main" ]
