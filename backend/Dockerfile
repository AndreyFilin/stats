FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN adduser -D nodeuser
USER nodeuser
EXPOSE 3000
CMD ["node", "src/index.ts"]