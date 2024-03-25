import { cache } from 'react';
import db from '@/db/drizzle';
import {auth} from "@clerk/nextjs";
import {eq} from "drizzle-orm";
import {courses, userProgress} from "@/db/schema";

// get user
export const getUserProgress = cache(async()=>{
    const { userId } = await auth();

    if (!userId){
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId,userId),
        with:{
            activeCourse: true,
        },
    });
})

// get courses
export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
    return data;
});

// get courses.id
export const getCoursesById = cache(async(courseId:number)=>{
    const data = await db.query.courses.findFirst({
        where:eq(courses.id, courseId),
        // TODO
    });
    return data;
})