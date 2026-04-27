// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Assets paths
const char1 = "/assets/char1.png";
const char2 = "/assets/char2.png";
const char3 = "/assets/char3.png";
const icon1 = "/assets/icon1.png";
const newsign = "/assets/newsign.png";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "GITHUB", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "INSTA",  color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "CLUB",   color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "github", label: "GITHUB", handle: "@ItsOkazaki", href: "https://github.com/ItsOkazaki", icon: "💻", bars: 1, 
    barIcon: icon1,
    links: ["GitHub Profile"],
    stats: [{ tag: "REPO", value: "15", color: "#4a8fff" }, { tag: "STR", value: "24", color: "#bf94ff" }],
  },
  {
    id: "instagram", label: "INSTAGRAM", handle: "@itsmeokazaki", href: "https://www.instagram.com/itsmeokazaki", icon: "📷", bars: 1, 
    barIcon: icon1,
    links: ["Mostapha Instagram"],
    stats: [{ tag: "FOL", value: "1.2K", color: "#e1306c" }, { tag: "PST", value: "85", color: "#f77737" }],
  },
  {
    id: "club", label: "QUANTUM CODE", handle: "@qc__club", href: "https://www.instagram.com/qc__club", icon: "⚛️", bars: 1, 
    barIcon: icon1,
    links: ["Quantum Code Profile"],
    stats: [{ tag: "FOL", value: "3K", color: "#00f2ea" }, { tag: "LKS", value: "12K", color: "#ff0050" }],
  },
];

export default function Socials({ src }) {
  const [active, setActive]               = useState(0);
  const [mounted, setMounted]             = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus]                 = useState("left");
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (focus === "left") {
        if (e.key === "ArrowUp")    setActive(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown")  setActive(i => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") { setFocus("right"); setActiveInfoBar(0); }
        if (e.key === "Enter")      window.open(ITEMS[active].href, "_blank");
      } else {
        const barCount = ITEMS[active].bars;
        if (e.key === "ArrowUp")   setActiveInfoBar(i => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar(i => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter")     window.open(ITEMS[active].href, "_blank");
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") router.back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, router, focus, activeInfoBar]);

  const current = ITEMS[active];

  return (
    <div id="menu-screen" className="relative w-full h-screen overflow-hidden bg-black">
      <video src={src} autoPlay loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60" />
      


      {/* Top Right Info Bar */}
      <div className="absolute top-24 right-10 z-[100] transition-all duration-300 transform scale-90 origin-top-right">
        <div className="relative min-w-[450px]">
           <div className="relative bg-white h-[60px] shadow-[10px_10px_0_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[8px] bg-[#c4001a] z-10" />
              <div className="flex items-center h-full px-6 gap-5 pt-[8px]">
                 <img src={icon1} className="h-9 object-contain" alt="" />
                 <span className="flex-1 font-[family-name:var(--font-bebas)] text-3xl text-black tracking-widest truncate uppercase">
                   {current.label}
                 </span>
                 <div className="bg-black text-white px-6 py-2 flex items-center gap-3">
                    <span className="text-[#4a8fff] font-[family-name:var(--font-bebas)] text-2xl">🌐</span>
                    <span className="font-[family-name:var(--font-anton)] text-2xl italic leading-none">{current.handle}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="sc-root">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
            onMouseEnter={() => setActive(i)}
            onClick={() => window.open(item.href, "_blank")}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              {/* Newsign inside the bar */}
              <img src={newsign} className="absolute top-1 left-2 h-6 object-contain z-20 animate-bounce" alt="" />
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content relative z-10 h-full flex items-center px-5">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="flex-1 flex justify-center px-10">
                   <div className="sc-label truncate w-full text-center">{item.label}</div>
                </div>
                <div className="sc-stats">
                  {item.stats.map(s => (
                    <div key={s.tag} className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <span className="sc-stat-tag px-2 py-0.5 border border-current text-[10px] leading-none" style={{ color: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num font-bold">{s.value}</span>
                      </div>
                      <div className="w-16 h-1 bg-black/30 overflow-hidden">
                        <div className="h-full bg-white transition-all duration-500" style={{ width: '70%', backgroundColor: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && Array.from({ length: ITEMS[active].bars }).map((_, i) => (
        <div
          key={`info-${active}-${i}`}
          className={`sc-info-bar-wrap ${activeInfoBar === i ? "scale-105" : "opacity-80"}`}
          style={{ top: `${155 + i * 52}px` }}
          onMouseEnter={() => setActiveInfoBar(i)}
          onClick={() => window.open(ITEMS[active].href, "_blank")}
        >
          <div className="sc-info-bar">
            <span className="sc-info-bar-text">{ITEMS[active].links[i]}</span>
            <div className="ml-auto flex items-center gap-4 px-6">
               <span className="bg-[#c4001a] text-white px-4 py-1 font-[family-name:var(--font-bebas)] text-xl tracking-[0.2em] skew-x-[-12deg] shadow-[4px_4px_0_rgba(0,0,0,0.4)]">
                 <span className="inline-block skew-x-[12deg]">CLICK TO OPEN</span>
               </span>
            </div>
          </div>
        </div>
      ))}

      <div className={`sc-footer mounted`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>OPEN</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <style>{`
        .sc-root {
          position: absolute; inset: 0; z-index: 10; pointer-events: none;
          display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 6px;
        }
        .sc-bar-outer {
          position: relative; transform: translateX(-100%); transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .sc-bar-outer.mounted { transform: translateX(0); }
        .sc-bar {
          position: relative; width: 45vw; height: 64px; background: #111; cursor: pointer; pointer-events: all;
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%); transition: height 0.3s ease;
        }
        .sc-bar-outer.active .sc-bar { height: 90px; }
        .sc-bar-red {
          position: absolute; top: 0; left: 0; width: 45vw; height: 64px; background: #c4001a;
          clip-path: polygon(50% 0, 100% 0, 100% 100%, calc(50% - 10px) 100%); transform: translateY(-7px);
          opacity: 0; transition: opacity 0.2s, height 0.3s;
        }
        .sc-bar-outer.active .sc-bar-red { opacity: 1; height: 90px; }
        .sc-bar-fill {
          position: absolute; inset: 0; background: #fff;
          clip-path: polygon(100% 0, 100% 0, calc(100% - 32px) 100%, calc(100% - 32px) 100%);
          transition: clip-path 0.35s ease;
        }
        .sc-bar-outer.active .sc-bar-fill {
          clip-path: polygon(22% 0, 100% 0, calc(100% - 14px) 100%, calc(22% + 138px) 100%);
        }
        .sc-role {
          font-family: var(--font-anton); font-size: 50px; color: #fff;
          transform: rotate(-30deg); flex-shrink: 0;
        }
        .sc-label { font-family: var(--font-bebas); font-size: 32px; color: #fff; transition: color 0.2s; letter-spacing: 2px; }
        .sc-bar-outer.active .sc-label { color: #111; }
        .sc-char {
          position: absolute; left: 110px; top: 0; height: 100%; z-index: 3;
          clip-path: polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%);
        }
        .sc-stats { display: flex; gap: 20px; padding-right: 20px; }
        .sc-stat-num { font-family: var(--font-bebas); font-size: 26px; color: #fff; }
        .sc-bar-outer.active .sc-stat-num { color: #111; }
        
        .sc-info-bar-wrap {
          position: fixed; right: 0; left: 65%; height: 46px; z-index: 50;
        }
        .sc-info-bar {
          background: #fff; border-radius: 7px; height: 100%; display: flex; align-items: center; padding: 0 15px;
        }
        .sc-info-bar-text { font-family: var(--font-bebas); color: #111; font-size: 20px; flex: 1; }

        .sc-footer {
          position: fixed; bottom: 20px; right: 28px; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; z-index: 14;
        }
        .sc-footer-row { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.4); font-family: var(--font-bebas); }
        .sc-footer-key { border: 1px solid rgba(255,255,255,0.2); padding: 1px 6px; font-size: 11px; }
      `}</style>
    </div>
  );
}
