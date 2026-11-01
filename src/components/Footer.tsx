import React from 'react';
import { ArrowUp, Github, Linkedin, Code, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#060608] border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-base font-bold font-display text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
            <span className="text-[#e2252b]">●</span>
            SHUBHAM SHARMA
          </span>
          <p className="text-xs text-neutral-400 font-mono">
            B.Tech Computer Science & Engineering · AIMT Lucknow (2023–2027)
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-neutral-400">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#00d4ff] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL_INFO.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            LeetCode
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 text-neutral-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5"
            title="Scroll to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-neutral-500">
        <span>"Code is Logic. Design is Feeling."</span>
        <span>© {new Date().getFullYear()} Shubham Sharma. All rights reserved.</span>
      </div>
    </footer>
  );
};
