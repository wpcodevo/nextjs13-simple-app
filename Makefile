commands:
	pnpm create next-app nextjs13-simple-app
	pnpm add @prisma/client && pnpm add -D prisma
	pnpm prisma init --datasource-provider sqlite
	pnpm prisma migrate dev --name init
	pnpm add -D ts-node
	pnpm prisma db seed