# # Dockerfile
# FROM node:20.9.0

# # Create app directory
# WORKDIR /usr/src/app/my-tech-blog

# # Copy package.json package-lock.json
# COPY ./package*.json .

# RUN ["npm", "install"]
# # RUN ["npm", "run", "build"]

# ベースイメージ
FROM node:20.9.0

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をコピーしてインストール
COPY package.json package-lock.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
# RUN npm run build

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
# CMD ["npm", "start"]
# RUN npm run dev
CMD ["npm", "run", "dev"]
