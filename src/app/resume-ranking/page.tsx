"use client";

import dynamic from "next/dynamic";

// Dynamically import the ResumeRankingApp component with no SSR
const ResumeRankingApp = dynamic(
  () => import("@/components/resume/ResumeRankingApp"),
  { ssr: false }
);

export default function ResumeRankingPage() {
  return (
    <div className="pt-24">
      <ResumeRankingApp />
    </div>
  );
}
