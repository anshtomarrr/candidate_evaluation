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
// Updated at Mon May 19 14:00:42 IST 2025
// Version update
