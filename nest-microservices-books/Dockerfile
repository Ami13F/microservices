FROM node:16.13.1 as development

WORKDIR /app

COPY package*.json /

COPY tsconfig*.json /

RUN npm install --quiet

COPY . .

RUN npm run build

CMD ['node', 'dist/main']