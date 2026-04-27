"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "identity", label: "IDENTITY" },
  { id: "career", label: "CAREER" },
  { id: "fun", label: "FUN FACTS" },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("identity");

  return (
    <div className="flex flex-col h-full max-w-2xl">
      <div className="flex gap-4 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-[family-name:var(--font-bebas)] text-2xl tracking-widest px-4 py-1 transition-all ${
              activeTab === tab.id
                ? "bg-[var(--p3-blue)] text-white skew-x-[-12deg]"
                : "text-[var(--p3-blue)] hover:text-white"
            }`}
          >
            <span className={activeTab === tab.id ? "inline-block skew-x-[12deg]" : ""}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white/5 p-8 border-l-4 border-[var(--p3-blue)] backdrop-blur-sm overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="font-[family-name:var(--font-bebas)] tracking-wide"
          >
            {activeTab === "identity" && (
              <div className="space-y-4">
                <h3 className="text-4xl text-[var(--p3-highlight)]">MOSTAPHA RAHMANI</h3>
                <div className="grid grid-cols-2 gap-4 text-xl">
                  <div>
                    <p className="text-white/40 text-sm">AGE</p>
                    <p>20 YEARS OLD</p>
                  </div>
                  <div>
                    <p className="text-white/40 text-sm">LOCATION</p>
                    <p>EL BAYADH, ALGERIA</p>
                  </div>
                </div>
                <p className="text-xl mt-4 leading-relaxed">
                  I am a passionate CS student with a drive for development and creativity. 
                  Currently exploring the depths of software engineering and game localization.
                </p>
              </div>
            )}

            {activeTab === "career" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl text-[var(--p3-highlight)]">EDUCATION</h3>
                  <p className="text-xl">University Center of El Bayadh, Algeria</p>
                  <p className="text-white/40">Computer Science Department</p>
                </div>
                <div>
                  <h3 className="text-3xl text-[var(--p3-highlight)]">ROLE</h3>
                  <p className="text-xl">Member of Quantum Code Club</p>
                  <p className="text-white/40 italic">IT Department Specialist</p>
                </div>
                <div>
                  <h3 className="text-3xl text-[var(--p3-highlight)]">EXPERIENCE</h3>
                  <p className="text-xl">Journalist at El Baraka & Echourok TV</p>
                  <p className="text-xl">Developer in Millennium Dawn mod (HOI4)</p>
                </div>
              </div>
            )}

            {activeTab === "fun" && (
              <div className="space-y-4">
                <h3 className="text-3xl text-[var(--p3-highlight)]">LIFESTYLE</h3>
                <ul className="space-y-3 text-xl">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[var(--p3-highlight)]" />
                    Hardcore Gamer
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[var(--p3-highlight)]" />
                    معرب العاب (Game Localizer)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[var(--p3-highlight)]" />
                    Journalism Enthusiast
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[var(--p3-highlight)]" />
                    Tech Explorer
                  </li>
                </ul>
                <div className="mt-8 p-4 border border-white/10 bg-white/5">
                  <p className="text-sm text-white/40 uppercase tracking-widest mb-1">Current Mood</p>
                  <p className="text-2xl">MEMENTO MORI</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
