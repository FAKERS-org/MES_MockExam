"use client";

import React from "react";
import { BookMarked } from "lucide-react";

export interface UniversityCard {
  id: number;
  name: string;
  logo: React.ReactNode;
  subjects: number;
}

interface UniversityCardProps {
  uni: UniversityCard;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ uni }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer group dark:bg-card dark:border-border">
    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
      {uni.logo}
    </div>
    <h3 className="text-sm font-semibold text-gray-800 mb-3 leading-snug min-h-[2.5rem] flex items-center justify-center dark:text-foreground">
      {uni.name}
    </h3>
    <div className="flex items-center gap-1.5 text-gray-400 text-xs dark:text-muted-foreground">
      <BookMarked size={14} />
      <span>{uni.subjects} មុខ</span>
    </div>
  </div>
);

export default UniversityCard;
