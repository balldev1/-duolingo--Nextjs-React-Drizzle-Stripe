import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";

// สารตั้งต้น seed
// Seed.script = ต้นแบบ db ที่จะใช้ = push.default.db
const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql,{schema});

// เชื่อมฐานข้อมูล database.neon
const main = async ()    =>{
    try {
        console.log("Seeding database")
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        // courses
        await db.insert(schema.courses).
            values([
            {
                id: 1,
                title: "Spainsh",
                imageSrc: "/es.svg",
            },
            {
                id: 2,
                title: "Italian",
                imageSrc: "/it.svg",
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                id: 4,
                title: "Croatian",
                imageSrc: "/hr.svg",
            },
        ]);

        // units.courseId ของประเทศนั้นๆ
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1,
            }
        ]);

        // lessons.unitId ของประเทศนั้นๆ
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns",
            },
            {
                id: 2,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 2,
                title: "Verbs",
            },
            {
                id: 3,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 3,
                title: "Verbs",
            },
            {
                id: 4,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 4,
                title: "Verbs",
            },
            {
                id: 5,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 5,
                title: "Verbs",
            },
        ]);

        console.log("Seeding finished");
    }catch (error){
        console.log(error);
        throw new Error("Failed to seed the database");
    }
}

main();