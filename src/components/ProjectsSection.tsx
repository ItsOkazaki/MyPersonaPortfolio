"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Star, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("https://api.github.com/users/ItsOkazaki/repos?sort=updated&per_page=6");
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c4001a]"></div>
      </div>
    );
  }

  return (
    <>
      {projects.map((project, i) => (
        <motion.a
          key={project.id}
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative bg-white/5 p-8 border-l-4 border-[#c4001a] hover:bg-[#c4001a]/20 transition-all backdrop-blur-md transform skew-x-[-4deg]"
        >
          <div className="transform skew-x-[4deg]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-[family-name:var(--font-anton)] italic text-3xl tracking-tighter text-[#f38493] group-hover:text-white transition-colors uppercase">
                {project.name.replace(/-/g, " ")}
              </h3>
              <Code className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
            </div>
            
            <p className="font-[family-name:var(--font-bebas)] text-xl text-white/70 group-hover:text-white mb-6 line-clamp-2 uppercase tracking-wider">
              {project.description || "System Archive: No Description Available"}
            </p>

            <div className="flex items-center gap-6 font-[family-name:var(--font-bebas)] text-lg opacity-40 group-hover:opacity-100 transition-opacity">
              {project.language && (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#c4001a]" />
                  {project.language}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                {project.stargazers_count}
              </span>
            </div>
            
            <div className="absolute top-0 right-0 w-10 h-10 bg-[#f38493] opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
               <ExternalLink className="w-5 h-5 text-[#04060f]" />
            </div>
          </div>
        </motion.a>
      ))}
    </>
  );
}
