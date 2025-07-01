#!/bin/sh

# Garante que o Prisma Client é gerado com os volumes já montados
npx prisma generate --schema=prisma/schema.prisma

# Sobe a aplicação
npm run dev
