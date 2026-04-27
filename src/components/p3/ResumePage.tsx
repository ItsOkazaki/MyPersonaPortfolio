// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "University / Coursework", rank: "SR" },
  { id: "ii", badge: "II", title: "SKILLS", subtitle: "Tech / Localization / Media", rank: "MAX" },
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "GitHub / Modding / Games", rank: "A" },
  { id: "iv", badge: "IV", title: "EXPERIENCE", subtitle: "Clubs / Journalism / Dev", rank: "S" },
];

const CONTENT = {
  0: {
    title: "EDUCATION LOG",
    index: "01",
    rows: [
      { index: "01", title: "Computer Science Core", status: "Active" },
      { index: "02", title: "Univ Center of El Bayadh", status: "2022-" },
      { index: "03", title: "Algorithm Analysis", status: "Done" },
      { index: "04", title: "Software Engineering", status: "Active" },
    ],
    details: [
      "- Currently pursuing BS in Computer Science.",
      "- Specializing in system architecture and coding.",
      "- Located in El Bayadh, Algeria.",
    ]
  },
  1: {
    title: "SKILLS ARCHIVE",
    index: "02",
    rows: [
      { index: "01", title: "Game Localization", status: "Expert" },
      { index: "02", title: "Technical Writing", status: "Pro" },
      { index: "03", title: "Fullstack Development", status: "High" },
      { index: "04", title: "Journalism / Media", status: "Top" },
    ],
    details: [
      "- Arabic Localization for major games (معرب العاب).",
      "- Proficiency in C++, Python, and Web Tech.",
      "- Content creation and broadcast journalism.",
    ]
  },
  2: {
    title: "PROJECT VAULT",
    index: "03",
    rows: [
      { index: "01", title: "Millennium Dawn Mod", status: "Active" },
      { index: "02", title: "Game Translations", status: "Done" },
      { index: "03", title: "Quantum Code IT", status: "Active" },
      { index: "04", title: "GitHub Portfolio", status: "Live" },
    ],
    details: [
      "- Developer for the Millennium Dawn (HOI4) mod.",
      "- Managing IT infrastructure for Quantum Code club.",
      "- Multiple open-source contributions on GitHub.",
    ]
  },
  3: {
    title: "SERVICE RECORD",
    index: "04",
    rows: [
      { index: "01", title: "Quantum Code Club", status: "IT Dept" },
      { index: "02", title: "El Baraka TV", status: "Journalist" },
      { index: "03", title: "Echourok TV", status: "Journalist" },
      { index: "04", title: "Independent Dev", status: "Current" },
    ],
    details: [
      "- Leading IT projects within the student club.",
      "- Reporting on tech and social events in Algeria.",
      "- Bridging the gap between media and technology.",
    ]
  }
};

export default function ResumePage({ src }) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") router.back();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const currentContent = CONTENT[active] || CONTENT[0];

  return (
    <div id="menu-screen" className="relative w-full h-screen overflow-hidden">
      <video src={src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="resume-entry-mask absolute inset-0 z-10 overflow-hidden bg-[#0047FF] pointer-events-none" aria-hidden="true">
        <video className="absolute inset-0 w-full h-full object-cover" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`
        .resume-entry-mask {
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.85);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: var(--font-anton), sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
        }
        .resume-badge-text {
          font-family: var(--font-bebas), sans-serif;
          font-size: 36px;
          color: #d2fdff;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text { color: #fff; }

        .resume-title {
          font-family: var(--font-anton), sans-serif;
          font-size: 56px;
          line-height: 0.9;
          color: #a5f6ff;
        }
        .resume-card-wrap.active .resume-title { color: #000; }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: var(--font-bebas), sans-serif;
          font-size: 28px;
          color: #9ffbff;
        }
        .resume-rank-number {
          font-family: var(--font-anton), sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number { color: #000; }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
        }
        .resume-card-wrap.active .resume-subtitle-bar { background: #000; }
        .resume-subtitle {
          font-family: var(--font-bebas), sans-serif;
          font-size: 28px;
          color: #041238;
        }
        .resume-card-wrap.active .resume-subtitle { color: #fff; }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow: 16px 16px 0 rgba(0, 6, 30, 0.55);
        }
        .resume-detail-top {
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index { font-family: var(--font-anton); font-size: 46px; }
        .resume-detail-top-title { font-family: var(--font-anton); font-size: 36px; }
        .resume-detail-top-progress { font-family: var(--font-bebas); font-size: 42px; }

        .resume-detail-list { margin-top: 18px; display: flex; flex-direction: column; gap: 8px; }
        .resume-detail-row {
          display: grid; grid-template-columns: 50px 1fr auto; align-items: center; gap: 14px;
          min-height: 56px; padding: 0 14px; background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
        }
        .resume-detail-row-index { font-family: var(--font-bebas); font-size: 26px; color: #94f4ff; }
        .resume-detail-row-title { font-family: var(--font-anton); font-size: 24px; color: #f2fcff; }
        .resume-detail-status {
          font-family: var(--font-bebas); font-size: 18px; color: #06133b; background: #8df6ff; padding: 4px 10px;
        }

        .resume-detail-bottom { margin-top: 22px; padding: 18px; background: rgba(5, 13, 57, 0.97); clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%); }
        .resume-detail-bottom-title { font-family: var(--font-bebas); font-size: 30px; color: #91f5ff; margin-bottom: 10px; }
        .resume-detail-bullet { font-family: var(--font-anton); font-size: 19px; color: #edfaff; margin-bottom: 4px; }
      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>DATA</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="resume-detail-panel">
          <div className="resume-detail-top">
            <div className="resume-detail-top-index">{currentContent.index}</div>
            <div className="resume-detail-top-title">{currentContent.title}</div>
            <div className="resume-detail-top-progress">ACCESS</div>
          </div>

          <div className="resume-detail-list">
            {currentContent.rows.map((row) => (
              <div className="resume-detail-row" key={row.index}>
                <div className="resume-detail-row-index">{row.index}</div>
                <div className="resume-detail-row-title">{row.title}</div>
                <div className="resume-detail-status">{row.status}</div>
              </div>
            ))}
          </div>

          <div className="resume-detail-bottom">
            <div className="resume-detail-bottom-title">DATA ANALYSIS</div>
            <div className="resume-detail-bullets">
              {currentContent.details.map((bullet, i) => (
                <div key={i} className="resume-detail-bullet">{bullet}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
