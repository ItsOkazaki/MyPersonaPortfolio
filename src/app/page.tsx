// @ts-nocheck
"use client";

import { useRouter } from "next/navigation";
import P3Menu from "@/components/p3/P3Menu";

// Main Menu Background Video
// Place your main1.mp4 in public/assets/ directory
const menuVideo = "/assets/main1.mp4";

export default function Home() {
  const router = useRouter();

  return (
    <div id="menu-screen" className="relative w-full h-screen overflow-hidden bg-black">
      <video 
        src={menuVideo} 
        autoPlay 
        loop 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <P3Menu onNavigate={(page) => {
        if (page === 'github') {
          router.push('/projects');
        } else if (page === 'sideproj') {
          router.push('/projects');
        } else {
          router.push(`/${page}`);
        }
      }} />

      {/* Development Credit */}
      <div className="absolute bottom-10 left-10 z-30 pointer-events-none">
        <p className="font-[family-name:var(--font-anton)] text-2xl text-white italic opacity-40 uppercase tracking-[0.3em]">
          DEVELOPED BY RAHMANI MOSTAPHA
        </p>
      </div>
    </div>
  );
}
