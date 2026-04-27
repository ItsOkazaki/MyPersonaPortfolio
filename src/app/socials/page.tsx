// @ts-nocheck
"use client";

import PageTransition from "@/components/p3/PageTransition";
import Socials from "@/components/p3/Socials";

const main3 = "/assets/main1.mp4"; // Fallback to main1 as main3 was not in user's list

export default function SocialsPage() {
  return (
    <PageTransition variant="socials">
      <Socials src={main3} />
    </PageTransition>
  );
}
