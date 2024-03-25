'use client';

import { courses } from '@/db/schema';
import {Card} from "@/app/(main)/courses/card";
import { useRouter } from "next/navigation";
import {useTransition} from "react";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId: number;
}

export const List = ({courses, activeCourseId}:Props) => {

    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
    if(pending) return;

    if (id === activeCourseId) {
        return router.push('/learn');
    }

        startTransition(() => {
           // ## 2.50
        });

    return(
        <div className='pt-6 grid grid-cols-2
        lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4'>
            {
                courses.map((course)=> (
                    <Card
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    imageSrc={course.imageSrc}
                    onClick={()=>{}}
                    disabled={false}
                    active={course.id === activeCourseId}
                    />
                ))
            }
        </div>
    )
}