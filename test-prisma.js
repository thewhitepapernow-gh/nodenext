
const { PrismaClient } = require('./prisma/generated/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');

const adapter = new PrismaLibSql({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
    try {
        console.log("Attempting to connect to Prisma with Adapter Factory...");
        const log = await prisma.chatLog.create({
            data: {
                query: "Test connectivity with adapter factory",
                answer: "Connection successful"
            }
        });
        console.log("Successfully created log:", log);
        const logs = await prisma.chatLog.findMany();
        console.log("Total logs count:", logs.length);
    } catch (e) {
        console.error("Prisma Connection Error:", e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
