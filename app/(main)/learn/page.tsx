import {StickyWrapper} from "@/components/sticky-wrapper";
import {FeedWrapper} from "@/components/feed-wrapper";
import {Header} from "@/app/(main)/learn/header";
import {UserProgress} from "@/components/user-progress";
import {
    getCourseProgress,
    getLessonPercentage,
    getUnits,
    getUserProgress,
    getUserSubscription
} from "@/db/queries";import { redirect } from "next/navigation";

const LearnPage = async () => {

    const userProgressData = getUserProgress();
    const unitsData = getUnits();

    const [userProgress,units] = await Promise.all([userProgressData,unitsData]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className='flex flex-row-reverse gap-[48px] px-6'>
            <StickyWrapper>
                <UserProgress
                        activeCourse={{title :"Spanish", imageSrc: "/es.svg"}}
                        hearts= {userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={false}
                    />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}/>
                {units.map((unit)=>(
                    <div key={units.id}>
                        {JSON.stringify(unit)}
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage;