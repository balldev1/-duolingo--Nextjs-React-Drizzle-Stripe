'use server'

import {auth, currentUser} from "@clerk/nextjs";
import {getCoursesById, getUserProgress} from "@/db/queries";
import db from "@/db/drizzle";
import {userProgress} from "@/db/schema";
import { revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

// action insert,update db.userProgress

// update course
export const upsertUserProgress = async (courseId:number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error('Unauthorized');
    }

    const course = await getCoursesById(courseId);

    if (!course){
        throw new Error('Course not Fond');
    }

    // if(!course.units.length || !course.units[0].lessons.length){
    //     throw new Error('Course is empty');
    // }

    // get datauser
    const existingUserProgress = await getUserProgress();

    // if มีข้อมูล อยู่แล้วให้ update
    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });

        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCourseId:courseId,
        userName: user.firstName || 'User',
        userImageSrc: user.imageUrl || '/mascot.svg',
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};