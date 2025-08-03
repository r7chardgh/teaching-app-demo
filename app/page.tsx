'use client'
import PageTransitionWrapper from "@/components/motionWrapper/PageTransitionWrapper";
import { IQuestion } from "@/lib/definition";
import { useEffect, useState } from "react";

export default function Home() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch((process.env.NEXT_PUBLIC_API_URI || 'http://localhost:3005') + '/api/questions')
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setQuestions(json);
      } catch (error) {

      }
    })()


  }, [])

  return (
    <main className=' w-full h-full flex flex-col flex-1 gap-6 '>
      <PageTransitionWrapper>
        <h1 className=" font-bold text-2xl">Questions</h1>
        <h3 className="text-lg uppercase font-semibold">jumbled sentences</h3>
        <ul className="flex flex-col gap-2">{questions.length > 0 ? questions.map((q: any, i) => <li key={i} className="flex gap-2 items-center justify-between"><p>#{i + 1}</p><p className="text-left flex-1">{q.question}</p><span className={`p-2 rounded-sm text-black bg-white bg-${q.level}`}>{q.level}</span></li>) : <p>loading...</p>}</ul>
      </PageTransitionWrapper>
    </main>
  );
}
