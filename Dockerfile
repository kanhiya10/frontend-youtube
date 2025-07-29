FROM node:22.15.0

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps && npm rebuild

COPY tsconfig.json ./

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]