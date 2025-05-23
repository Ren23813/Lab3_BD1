FROM oven/bun:latest

WORKDIR /app

# Copia los archivos del package y lock para instalar dependencias
COPY package.json bun.lock ./
RUN bun install

# Copia el resto del proyecto
COPY . .

# Exponemos el puerto por defecto de Vite
EXPOSE 5173

# Comando por defecto para desarrollo
CMD ["bun", "run", "dev", "--host"]
