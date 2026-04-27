// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageTransition from "@/components/p3/PageTransition";
import AboutMe from "@/components/p3/AboutMe";

const main1 = "https://assets.mixkit.co/videos/preview/mixkit-star-field-in-the-galaxy-at-night-24422-large.mp4";

export default function AboutPage() {
  return (
    <PageTransition variant="about">
      <AboutMe src={main1} />
    </PageTransition>
  );
}
