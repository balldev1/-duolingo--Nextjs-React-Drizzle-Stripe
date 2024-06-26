"use client";

import {challengeOptions, challenges} from "@/db/schema";
import {useState} from "react";
import {Header} from "@/app/lesson/header";
import {QuestionBubble} from "@/app/lesson/question-bubble";
import {Challenge} from "@/app/lesson/challenge";
import {Footer} from "@/app/lesson/footer";

type Props = {
    initialPercentage : number;
    initialHearts : number;
    initialLessonId : number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
};

export const Quiz = ({
                         initialPercentage,
                         initialHearts,
                         initialLessonId,
                         initialLessonChallenges,
                         userSubscription
                     }: Props) =>{

    const [hearts, setHearts] = useState( initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(initialLessonChallenges);
    // ให้ activeIndex === Index.challenges , !challenge.completed
    const [activeIndex, setActiveIndex] = useState(()=>{
        const uncompletedIndex = challenges.findIndex((challenge)=>!challenge.completed);
        //ถ้าได้ต่ำกว่า -1 ให้แสดงเป็น 0 / ถ้าได้มากกว่า 0 ให้แสดงเลข uncompletedIndex
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus]
        = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onSelect = (id:number) => {
        if(status !== "none") return ;

        setSelectedOption(id);
    }

    const title = challenge.type === "ASSIST"
    ? "Select the correct meaning"
        : challenge.question

    return (
        <>
            <Header
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                        { challenge.type === "ASSIST" && (
                            <QuestionBubble
                            question={challenge.question}
                            />
                        ) }
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={false}
                                type={challenge.type}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
            disabled={!selectedOption}
            status={"completed" || status}
            onCheck={()=>{}}
            />
        </>
    )
}