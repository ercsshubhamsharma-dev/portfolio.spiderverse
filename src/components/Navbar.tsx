import React, { useState } from 'react';
import { Menu, X, FileText, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  activeThemeName: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, activeThemeName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Playground', href: '#playground' },
    { label: 'Lab Experiments', href: '#experiments' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/90 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <a
          href="#"
          className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-[#e2252b] transition-colors whitespace-nowrap shrink-0 font-display flex items-center gap-2"
        >
          <span className="text-[#e2252b]">●</span>
          <span>SHUBHAM SHARMA</span>
          <span className="hidden sm:inline-block text-xs font-mono font-normal text-neutral-400">
            / {activeThemeName.split(' ')[0]}
          </span>
        </a>

        {/* Zone 2: Clean single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white hover:underline underline-offset-4 decoration-[#e2252b] decoration-2 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white bg-[#e2252b] hover:bg-[#c51c22] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Resume
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white border border-white/10 rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d0d12] border-b border-white/10 px-6 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#00d4ff]" />
              Lucknow, India · AIMT 2027
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="text-xs font-semibold text-[#e2252b] hover:underline"
            >
              Open Full Resume →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
