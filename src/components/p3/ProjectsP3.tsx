// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Assets paths
const char1 = "/assets/char1.png";
const char2 = "/assets/char2.png";
const char3 = "/assets/char3.png";
const bgVideo = "/assets/main1.mp4";
const icon3 = "/assets/icon3.png";
const newsign = "/assets/newsign.png";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "REPO", color: "#e8c100" },
  { text: "PROJ", color: "#4a8fff" },
  { text: "CODE", color: "#4a8fff" },
];

export default function ProjectsP3({ src }) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    async function fetchProjects() {
      try {
        const res = await fetch("https://api.github.com/users/ItsOkazaki/repos?sort=updated&per_page=5");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data.map((repo, i) => ({
            id: repo.id,
            label: repo.name.toUpperCase().replace(/-/g, " "),
            handle: repo.language || "CODE",
            href: repo.html_url,
            icon: "📂",
            stars: repo.stargazers_count,
            stats: [
              { tag: "STR", value: repo.stargazers_count, color: "#4a8fff" },
              { tag: "FORK", value: repo.forks_count, color: "#bf94ff" },
            ],
            reveal: {
              upper: [repo.name, `Language: ${repo.language || 'Unknown'}`],
              lower: repo.description || "No description provided for this repository."
            }
          })));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchProjects();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive(i => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive(i => Math.min(projects.length - 1, i + 1));
      if (e.key === "Enter" || e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else router.back();
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        if (revealed) setRevealed(false);
        else router.back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, router, revealed, projects]);

  if (projects.length === 0) return <div className="bg-black w-full h-screen flex items-center justify-center font-[family-name:var(--font-bebas)] text-4xl text-white tracking-widest uppercase">Accessing Archives...</div>;

  const current = projects[active];

  return (
    <div id="menu-screen" className="relative w-full h-screen overflow-hidden bg-black">
      <video src={src || bgVideo} autoPlay loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-40" />
      


      {/* Top Right Info Bar */}
      <div className="absolute top-24 right-10 z-[100] transition-all duration-300 transform scale-90 origin-top-right">
        <div className="relative bg-white min-w-[450px] h-[60px] shadow-[10px_10px_0_rgba(0,0,0,0.5)] overflow-hidden">
           <div className="absolute top-0 left-0 right-0 h-[8px] bg-[#c4001a] z-10" />
           <div className="flex items-center h-full px-6 gap-5 pt-[8px]">
              <img src={newsign} className="h-7 object-contain" alt="" />
              <img src={icon3} className="h-9 object-contain" alt="" />
              <span className="flex-1 font-[family-name:var(--font-bebas)] text-3xl text-black tracking-widest truncate uppercase">
                {current.label}
              </span>
              <div className="bg-black text-white px-6 py-2 flex items-center gap-3">
                 <span className="text-[#e8c100] font-[family-name:var(--font-bebas)] text-2xl">★</span>
                 <span className="font-[family-name:var(--font-anton)] text-2xl italic leading-none">{current.stars}</span>
              </div>
           </div>
        </div>
      </div>

      {revealed && <div className="sc-dim" />}
      
      {revealed && (
        <div className={`sc-reveal-panel mounted`}>
          <div className="sc-reveal-upper-bar">
            {current.reveal.upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar" onClick={() => window.open(current.href, "_blank")}>
             GO TO REPOSITORY ◄
          </div>
          <div className="absolute top-[65%] left-10 right-10 text-black font-[family-name:var(--font-bebas)] text-2xl tracking-widest leading-relaxed">
            {current.reveal.lower}
          </div>
        </div>
      )}

      {revealed && (
        <div className="sc-main-portrait-shell mounted">
          <img className="sc-main-portrait" src={CHARS[active % CHARS.length]} alt="" />
        </div>
      )}

      <div className="sc-root">
        {projects.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            style={{ transitionDelay: `${i * 80}ms` }}
            onMouseEnter={() => setActive(i)}
            onClick={() => setRevealed(true)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i % CHARS.length]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content relative z-10 h-full flex items-center px-5">
                <div className="sc-role">{ROLES[i % ROLES.length].text}</div>
                <div className="flex-1 flex justify-center px-10">
                   <div className="sc-label truncate w-full text-center">{item.label}</div>
                </div>
                <div className="sc-stats flex items-center gap-6">
                  <div className="flex gap-2 mr-6">
                    {item.handle && (
                      <span 
                        className="bg-[#c4001a] text-white px-4 py-0.5 border-l-[3px] border-white font-[family-name:var(--font-anton)] text-[18px] italic tracking-wider shadow-[4px_4px_0_rgba(0,0,0,0.8)] leading-none"
                        style={{ clipPath: 'polygon(0% 0%, 100% 10%, 96% 100%, 4% 90%)' }}
                      >
                        <span className="uppercase">{item.handle}</span>
                      </span>
                    )}
                  </div>
                  {item.stats.map(s => (
                    <div key={s.tag} className="flex flex-col items-start gap-1">
                      <div className="flex items-center gap-2">
                        <span className="sc-stat-tag px-2 py-0.5 border border-current text-[10px] leading-none" style={{ color: s.color }}>{s.tag}</span>
                        <span className="sc-stat-num font-bold">{s.value}</span>
                      </div>
                      <div className="w-16 h-1 bg-black/30 overflow-hidden">
                        <div className="h-full bg-white" style={{ width: '60%', backgroundColor: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer mounted`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>PROJECT INFO</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>

      <style>{`
        .sc-root {
          position: absolute; inset: 0; z-index: 6; pointer-events: none;
          display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 6px;
        }
        .sc-dim {
          position: absolute; inset: 0; z-index: 12; background: rgba(40, 45, 54, 0.68);
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
        .sc-stat-num { font-family: var(--font-bebas); font-size: 26px; color: #fff; }
        .sc-bar-outer.active .sc-stat-num { color: #111; }

        .sc-reveal-panel {
          position: absolute; top: 44vh; left: -6vw; width: 88vw; height: 60vh; z-index: 12;
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(243,246,252,0.98) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 88px) 100%, 0 100%);
          transform: rotate(-20deg); transform-origin: left bottom;
        }
        .sc-reveal-upper-bar {
          position: absolute; top: 10%; width: 100%; height: 40%; background: #000;
          display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff;
        }
        .sc-reveal-upper-line { font-family: var(--font-anton); font-style: italic; font-size: 42px; letter-spacing: 2px; text-transform: uppercase; }
        .sc-reveal-lower-bar {
          position: absolute; top: 58%; right: 0; width: 48%; height: 15%; background: #c4001a;
          display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer;
          font-family: var(--font-bebas); font-size: 28px; letter-spacing: 2px;
        }

        .sc-main-portrait-shell {
          position: absolute; top: 0; right: -3vw; z-index: 13; width: 43vw; height: 100vh; overflow: hidden;
        }
        .sc-main-portrait {
          width: 100%; height: 100%; object-fit: cover; transform: skewX(-8deg);
        }
        .sc-footer {
          position: fixed; bottom: 20px; right: 28px; display: flex; flex-direction: column; align-items: flex-end; gap: 5px; z-index: 14;
        }
        .sc-footer-row { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.4); font-family: var(--font-bebas); }
        .sc-footer-key { border: 1px solid rgba(255,255,255,0.2); padding: 1px 6px; font-size: 11px; }
      `}</style>
    </div>
  );
}
