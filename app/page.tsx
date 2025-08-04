'use client'
import PageTransitionWrapper from "@/components/motionWrapper/PageTransitionWrapper";
import { IQuestion } from "@/lib/definition";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const level = ['easy', 'intermediate', 'hard'];
  return (
    <main className='w-full h-full flex-1 py-6'>
      <PageTransitionWrapper>
        <div className="flex flex-col gap-6">
          <p className=" font-bold text-2xl">Welcome to playground!</p>
          <p className="text-lg capitalize font-semibold">Game: jumbled sentences</p>
          <div className="grid grid-cols-2 gap-9">
            {level.length > 0 && level.map((l, i) =>
              <Link key={l + i} className="p-6 h-30 rounded-sm bg-neutral hover:bg-accent hover:text-textPrimary! select-none transition-all " href={`/game/${l}`}><h3 className="text-lg sm:text-4xl font-semibold capitalize">Level {l}</h3></Link>
            )}
          </div>
        </div>
      </PageTransitionWrapper>
    </main>
  );
}
