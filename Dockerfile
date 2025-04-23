FROM node:14-alpine

WORKDIR /app

# 安裝依賴
COPY package*.json ./
RUN npm install

# 複製應用程式文件
COPY . .

# 暴露端口
EXPOSE 3000

# 啟動應用程式
CMD ["node", "server.js"]