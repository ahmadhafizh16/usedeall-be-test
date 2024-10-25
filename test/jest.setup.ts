import { execSync } from 'child_process';
import { config } from 'dotenv';

config({ path: '.env.test' });

export default async function globalSetup() {
  console.log('Init Testing Database');
  execSync(
    `DB_URL=${process.env.DB_URL} npx prisma migrate reset --force --schema=src/ship/database/schema.prisma > /dev/null 2>&1`,
    { stdio: 'inherit' },
  );
  execSync(
    `DB_URL=${process.env.DB_URL} npx prisma db push --schema=src/ship/database/schema.prisma > /dev/null 2>&1`,
    { stdio: 'inherit' },
  );
  execSync(
    `DB_URL=${process.env.DB_URL} npx prisma generate --schema=src/ship/database/schema.prisma > /dev/null 2>&1`,
    { stdio: 'inherit' },
  );
}
