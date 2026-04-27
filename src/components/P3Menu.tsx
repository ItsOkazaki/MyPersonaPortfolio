"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ITEMS = [
  { id: "about", label: "ABOUT ME", fontSize: 130, offsetX: 0, offsetY: 0 },
  { id: "resume", label: "RESUME", fontSize: 108, offsetX: 38, offsetY: -8 },
  { id: "projects", label: "PROJECTS", fontSize: 95, offsetX: 20, offsetY: -6 },
  { id: "socials", label: "SOCIALS", fontSize: 88, offsetX: 14, offsetY: -4 },
];

const CLIP_SHAPES = [
  (w: number, h: number) =>
    `polygon(0px ${h * 0.06}px, ${w - h * 0.55}px 0px, ${w}px ${h * 0.42}px, ${
      w - h * 0.18
    }px ${h}px, 0px ${h * 0.94}px)`,
  (w: number, h: number) =>
    `polygon(${h * 0.12}px 0px, ${w - h * 0.3}px ${h * 0.04}px, ${w}px ${
      h * 0.5
    }px, ${w - h * 0.08}px ${h}px, 0px ${h * 0.88}px)`,
  (w: number, h: number) =>
    `polygon(0px ${h * 0.1}px, ${w - h * 0.4}px 0px, ${w}px ${h * 0.45}px, ${
      w - h * 0.25
    }px ${h}px, ${h * 0.05}px ${h * 0.9}px)`,
  (w: number, h: number) =>
    `polygon(0px ${h * 0.05}px, ${w - h * 0.5}px 0px, ${w}px ${h * 0.4}px, ${
      w - h * 0.15
    }px ${h}px, 0px ${h * 0.95}px)`,
];

interface P3MenuProps {
  onSelect: (id: string) => void;
  activeId: string;
}

export default function P3Menu({ onSelect, activeId }: P3MenuProps) {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const currentIndex = ITEMS.findIndex(item => item.id === activeId);
    if (currentIndex !== -1) setActive(currentIndex);
  }, [activeId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        const next = Math.max(0, active - 1);
        setActive(next);
      }
      if (e.key === "ArrowDown") {
        const next = Math.min(ITEMS.length - 1, active + 1);
        setActive(next);
      }
      if (e.key === "Enter") {
        onSelect(ITEMS[active].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onSelect]);

  return (
    <nav className="relative z-20 flex flex-col p-12">
      {ITEMS.map((item, i) => {
        const isActive = active === i;
        const dist = Math.abs(i - active);
        const opacity = isActive ? 1 : Math.max(0.18, 1 - dist * 0.38);
        const estW = item.label.length * item.fontSize * 0.6 + 80;
        const estH = item.fontSize * 0.94;
        const clipFn = CLIP_SHAPES[i] ?? CLIP_SHAPES[0];

        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            onMouseEnter={() => setActive(i)}
            className={cn(
              "relative flex items-center line-none text-left transition-all duration-380 cubic-bezier(0.22, 1, 0.36, 1)",
              mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-9",
              isActive && "active"
            )}
            style={{
              marginLeft: item.offsetX,
              marginTop: item.offsetY,
              transitionDelay: mounted ? `${i * 80}ms` : "0ms",
            }}
          >
            <div
              className={cn(
                "absolute -left-12 top-1/2 -translate-y-1/2 bg-[var(--p3-highlight)] z-[-1] transition-transform duration-220 cubic-bezier(0.22, 1, 0.36, 1) origin-left pointer-events-none",
                isActive ? "scale-x-100" : "scale-x-0"
              )}
              style={{
                width: estW,
                height: estH,
                clipPath: clipFn(estW, estH),
              }}
            />
            <span
              className={cn(
                "font-[family-name:var(--font-bebas)] block tracking-widest leading-[0.85] relative z-[1] transition-all duration-120",
                isActive ? "text-white" : "text-[var(--p3-blue)] hover:text-[#4a82c8]"
              )}
              style={{ fontSize: item.fontSize, opacity }}
            >
              {item.label}
            </span>
          </button>
        );
      })}

      <div className={cn(
        "absolute bottom-[-100px] left-0 font-[family-name:var(--font-bebas)] opacity-0 transition-opacity duration-500 delay-900",
        mounted && "opacity-100"
      )}>
        <div className="flex items-center gap-2 text-[13px] tracking-widest text-white/30">
          <span className="border border-white/20 rounded px-1.5 py-0.5 text-[11px]">↑↓</span>
          <span>NAVIGATE</span>
        </div>
        <div className="flex items-center gap-2 text-[13px] tracking-widest text-white/30 mt-1">
          <span className="border border-white/20 rounded px-1.5 py-0.5 text-[11px]">↵</span>
          <span>CONFIRM</span>
        </div>
      </div>
    </nav>
  );
}
