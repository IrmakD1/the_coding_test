FROM node:14.17.0 as distro
WORKDIR /app
COPY ./src ./src
COPY ./data ./data
COPY ./package.json ./
RUN npm i --no-package-lock
ENTRYPOINT ["node", "src/index.js"]