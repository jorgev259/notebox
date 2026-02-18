import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/client";
import {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from "astro:env/server";

const adapter = new PrismaMariaDb({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  connectionLimit: 5,
});
const prismaClient = new PrismaClient({ adapter });

export { prismaClient };
