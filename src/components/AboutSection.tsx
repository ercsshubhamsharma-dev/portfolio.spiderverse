import React, { useState } from 'react';
import { User, Sparkles, GraduationCap, MapPin, Calendar, Camera } from 'lucide-react';
import { PERSONAL_INFO, LEARNING_TIMELINE } from '../data/portfolioData';
import { SpiderWebSvg } from './SpiderWebSvg';
import { playComicSound } from '../utils/audio';

interface AboutSectionProps {
  primaryColor: string;
  secondaryColor: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  primaryColor,
  secondaryColor,
}) => {
  const [activePhotoView, setActivePhotoView] = useState<'formal' | 'sunglasses'>('sunglasses');

  return (
    <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10 relative">
      <div className="absolute top-12 right-6 pointer-events-none opacity-20">
        <SpiderWebSvg size={160} color={secondaryColor} variant="radial" />
      </div>

      {/* Section Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#00d4ff]">
          <User className="w-3.5 h-3.5" />
          <span>ORIGIN STORY & PROFILE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
          ABOUT ME
        </h2>
        <p className="text-neutral-300 max-w-2xl text-base leading-relaxed">
          The mind behind the code. A Computer Science Engineering undergraduate navigating the intersection of algorithmic logic and creative digital expression.
        </p>
      </div>

      {/* Split Profile & Cinematic Portrait Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        {/* Left Column: Official Profile & Real Introduction (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-[#0f0f16] border border-white/10 rounded-2xl space-y-4 shadow-xl">
            <h3 className="text-2xl font-bold font-display text-white">
              Shubham Sharma
            </h3>

            <p className="text-base text-neutral-200 leading-relaxed font-normal">
              "{PERSONAL_INFO.aboutIntroduction}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#e2252b]" />
                <span>B.Tech CSE (2023–2027)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#00d4ff]" />
                <span>AIMT, Lucknow, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Python 75% IIT Bombay</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>3x Singing Gold Medalist</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-black/40 border border-white/10 rounded-xl text-xs text-neutral-300 leading-relaxed space-y-2">
            <span className="font-bold text-white block font-display">
              Creative Philosophy: "Code is Logic. Design is Feeling."
            </span>
            <p>
              Rather than viewing software engineering and visual design as separate disciplines, I treat them as complementary lenses: rigorous Python and Java data structures ensure reliability, while comic art direction, WebGL 3D, and typography turn that logic into something memorable.
            </p>
          </div>
        </div>

        {/* Right Column: Dual Cinematic Composition (Formal & Sunglasses) (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 border-white/15 bg-[#12121a] shadow-2xl p-2 group">
            {/* Halftone texture */}
            <div className="absolute inset-0 halftone-bg opacity-25 pointer-events-none z-10" />

            {/* Comic Frame Corner Markers */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white/70 pointer-events-none z-20" />
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white/70 pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white/70 pointer-events-none z-20" />
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white/70 pointer-events-none z-20" />

            {/* Frame display with real photograph */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900 flex flex-col justify-between">
              {/* Actual Uploaded Portrait Image */}
              <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={PERSONAL_INFO.uploadedPortraitUrl}
                  alt="Shubham Sharma — Creative Developer Portrait"
                  className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
                    activePhotoView === 'formal'
                      ? 'contrast-110 saturate-[0.85]'
                      : 'contrast-105'
                  }`}
                />

                {/* Comic Halftone Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Dimension Tag */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5">
                  <span
                    className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md tracking-wider text-white shadow-lg ${
                      activePhotoView === 'sunglasses'
                        ? 'bg-[#00d4ff] text-black'
                        : 'bg-[#e2252b] text-white'
                    }`}
                  >
                    {activePhotoView === 'sunglasses' ? 'SUNGLASSES · MULTIVERSE' : 'ORIGINAL PORTRAIT'}
                  </span>
                </div>
              </div>

              {/* Bottom Scrim & View Switcher */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-20 flex items-center justify-between bg-gradient-to-t from-black via-black/80 to-transparent">
                <div>
                  <span className="text-sm font-bold font-display text-white block">
                    SHUBHAM SHARMA
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {activePhotoView === 'sunglasses'
                      ? 'Creative Coding & Visual Direction'
                      : 'Computer Science & Engineering'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-black/70 p-1 rounded-lg border border-white/15">
                  <button
                    onClick={() => {
                      setActivePhotoView('sunglasses');
                      playComicSound('zap');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-all ${
                      activePhotoView === 'sunglasses'
                        ? 'bg-[#00d4ff] text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Sunglasses
                  </button>
                  <button
                    onClick={() => {
                      setActivePhotoView('formal');
                      playComicSound('thwip');
                    }}
                    className={`px-2.5 py-1 text-xs font-mono rounded cursor-pointer transition-all ${
                      activePhotoView === 'formal'
                        ? 'bg-[#e2252b] text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Alternate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Learning Journey Timeline */}
      <div className="mt-16 space-y-8">
        <div>
          <h3 className="text-2xl font-bold font-display text-white">
            THE LEARNING JOURNEY
          </h3>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Progression from foundational computer science to creative interactive engineering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEARNING_TIMELINE.map((item, index) => (
            <div
              key={item.year}
              className="bg-[#0f0f16] border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg relative group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-display text-[#e2252b]">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    PHASE 0{index + 1}
                  </span>
                </div>

                <h4 className="text-base font-bold font-display text-white group-hover:text-[#00d4ff] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs font-mono text-[#00d4ff]">
                  {item.subtitle}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-white/5">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
