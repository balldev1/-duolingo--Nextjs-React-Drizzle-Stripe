import {integer, pgTable,  serial, text} from 'drizzle-orm/pg-core';
import {relations} from "drizzle-orm";

// courses
export const courses = pgTable("courses",{
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

// ความสัมพันธ์ระหว่างตารางตัวเอง
export const coursesRelations = relations(courses,({many})=>({
    userProgress: many(userProgress),
}))

// user
export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default('/mascot.svg'),
    activeCourseId: integer("active_course_id").references(() => courses.id, {onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});

// ความสัมพันธ์ระหว่างตารางuserProgress ,กับตารางอื่น
export const userProgressRelations = relations(userProgress,({one})=>({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}));