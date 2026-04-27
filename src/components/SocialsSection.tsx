"use client";

import { motion } from "framer-motion";
import { Code, Camera, Users, Link as LinkIcon, ExternalLink } from "lucide-react";

const SOCIALS = [
  {
    id: "github",
    label: "GITHUB",
    username: "@ItsOkazaki",
    url: "https://github.com/ItsOkazaki",
    icon: Code,
    color: "hover:bg-gray-800",
  },
  {
    id: "instagram",
    label: "INSTAGRAM",
    username: "@itsmeokazaki",
    url: "https://www.instagram.com/itsmeokazaki",
    icon: Camera,
    color: "hover:bg-pink-800",
  },
  {
    id: "club",
    label: "QUANTUM CODE",
    username: "@qc__club",
    url: "https://www.instagram.com/qc__club",
    icon: Users,
    color: "hover:bg-blue-800",
  },
];

export default function SocialsSection() {
  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <h3 className="font-[family-name:var(--font-bebas)] text-4xl tracking-widest text-[var(--p3-highlight)] mb-4">
        NETWORK ACCESS
      </h3>
      
      <div className="space-y-4">
        {SOCIALS.map((social, i) => (
          <motion.a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`group relative flex items-center gap-6 p-6 bg-white/5 border-l-4 border-[var(--p3-blue)] transition-all backdrop-blur-sm ${social.color}`}
          >
            <div className="p-3 bg-white/10 group-hover:bg-white/20 rounded-full transition-colors">
              <social.icon className="w-8 h-8" />
            </div>
            
            <div className="flex-1">
              <p className="font-[family-name:var(--font-bebas)] text-3xl tracking-wider leading-none">
                {social.label}
              </p>
              <p className="font-[family-name:var(--font-bebas)] text-white/40 group-hover:text-white/60 tracking-widest uppercase text-sm">
                {social.username}
              </p>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-6 h-6" />
            </div>

            {/* Persona 3 aesthetic deco */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-20">
              <div className="w-1 h-1 bg-white" />
              <div className="w-1 h-1 bg-white" />
              <div className="w-1 h-1 bg-white" />
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-8 p-6 border-t border-white/10">
        <p className="font-[family-name:var(--font-bebas)] text-sm text-white/20 tracking-[0.3em] uppercase">
          Authorization Status: GRANTED
        </p>
      </div>
    </div>
  );
}
