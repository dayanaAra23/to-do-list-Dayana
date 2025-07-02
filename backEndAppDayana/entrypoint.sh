#!/bin/sh

npx prisma generate --schema=prisma/schema.prisma
npm run dev
