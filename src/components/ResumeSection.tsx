"use client";

import { motion } from "framer-motion";
import { FileText, Download, Briefcase, GraduationCap, Award } from "lucide-react";

export default function ResumeSection() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl h-full overflow-y-auto pr-4 pb-12">
      <div className="flex justify-between items-center">
        <h3 className="font-[family-name:var(--font-bebas)] text-4xl tracking-widest text-[var(--p3-highlight)]">
          SERVICE RECORD
        </h3>
        <button className="flex items-center gap-2 bg-[var(--p3-blue)] px-4 py-2 font-[family-name:var(--font-bebas)] tracking-widest hover:bg-[var(--p3-highlight)] transition-colors">
          <Download className="w-4 h-4" />
          DOWNLOAD PDF
        </button>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-3 mb-4 text-[var(--p3-blue)]">
            <GraduationCap className="w-6 h-6" />
            <h4 className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest uppercase">Education</h4>
          </div>
          <div className="border-l-2 border-white/10 ml-3 pl-6 py-2">
            <p className="text-xl font-[family-name:var(--font-bebas)]">CS Student</p>
            <p className="text-white/60">University Center of El Bayadh | 2022 - Present</p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4 text-[var(--p3-blue)]">
            <Briefcase className="w-6 h-6" />
            <h4 className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest uppercase">Experience</h4>
          </div>
          <div className="space-y-6 border-l-2 border-white/10 ml-3 pl-6 py-2">
            <div>
              <p className="text-xl font-[family-name:var(--font-bebas)]">IT Department Member</p>
              <p className="text-white/60">Quantum Code Club | 2023 - Present</p>
            </div>
            <div>
              <p className="text-xl font-[family-name:var(--font-bebas)]">Journalist</p>
              <p className="text-white/60">El Baraka & Echourok TV | 2023 - Present</p>
            </div>
            <div>
              <p className="text-xl font-[family-name:var(--font-bebas)]">Mod Developer</p>
              <p className="text-white/60">Millennium Dawn (HOI4) | Ongoing</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4 text-[var(--p3-blue)]">
            <Award className="w-6 h-6" />
            <h4 className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest uppercase">Specializations</h4>
          </div>
          <div className="grid grid-cols-2 gap-4 ml-3 pl-6">
            <div className="bg-white/5 p-3 border border-white/10 font-[family-name:var(--font-bebas)]">
              GAME LOCALIZATION
            </div>
            <div className="bg-white/5 p-3 border border-white/10 font-[family-name:var(--font-bebas)]">
              SOFTWARE DEVELOPMENT
            </div>
            <div className="bg-white/5 p-3 border border-white/10 font-[family-name:var(--font-bebas)]">
              TECHNICAL WRITING
            </div>
            <div className="bg-white/5 p-3 border border-white/10 font-[family-name:var(--font-bebas)]">
              SYSTEM ANALYSIS
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
