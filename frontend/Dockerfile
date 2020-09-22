FROM node:12.18.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
