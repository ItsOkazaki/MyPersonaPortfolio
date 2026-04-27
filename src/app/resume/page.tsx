// @ts-nocheck
"use client";

import PageTransition from "@/components/p3/PageTransition";
import ResumePage from "@/components/p3/ResumePage";

const main2 = "/assets/main1.mp4"; // Fallback to main1 as main2 was not in user's list

export default function Resume() {
  return (
    <PageTransition variant="resume">
      <ResumePage src={main2} />
    </PageTransition>
  );
}
