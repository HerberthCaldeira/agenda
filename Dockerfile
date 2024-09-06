# Usar a imagem oficial do Node.js
FROM node:20-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de package.json e package-lock.json para o container
COPY ./react/package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o conteúdo do projeto para dentro do container
COPY ./react .

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
