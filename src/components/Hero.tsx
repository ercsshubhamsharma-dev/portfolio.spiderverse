import React, { useState } from 'react';
import { ArrowDown, Sparkles, Sliders, Upload, Camera, ExternalLink } from 'lucide-react';
import { SpiderWebSvg } from './SpiderWebSvg';
import { playComicSound } from '../utils/audio';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onExploreWork: () => void;
  onEnterPlayground: () => void;
  onContactMe: () => void;
  primaryColor: string;
  secondaryColor: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreWork,
  onEnterPlayground,
  onContactMe,
  primaryColor,
  secondaryColor,
}) => {
  // Portrait dimension toggle: 'formal' or 'sunglasses'
  const [activePortrait, setActivePortrait] = useState<'formal' | 'sunglasses'>('sunglasses');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [customFormalSrc, setCustomFormalSrc] = useState<string | null>(PERSONAL_INFO.uploadedPortraitUrl);
  const [customSunglassesSrc, setCustomSunglassesSrc] = useState<string | null>(PERSONAL_INFO.uploadedPortraitUrl);

  const handlePortraitToggle = () => {
    const next = activePortrait === 'formal' ? 'sunglasses' : 'formal';
    setActivePortrait(next);
    playComicSound('thwip');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'formal' | 'sunglasses') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (type === 'formal') {
          setCustomFormalSrc(result);
        } else {
          setCustomSunglassesSrc(result);
        }
      };
      reader.readAsDataURL(file);
      playComicSound('zap');
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-10 pb-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative SVG Spider-Web Corner flourish */}
      <div className="absolute -top-6 -right-6 pointer-events-none opacity-40">
        <SpiderWebSvg size={220} color={primaryColor} variant="corner" />
      </div>

      {/* Hero Grid Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Column: Oversized Typography & Editorial Positioning (7 cols) */}
        <div className="lg:col-span-7 space-y-6 z-10">
          {/* Comic Universe Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-neutral-300">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
            <span>EARTH-1610 // CREATIVE CODER & DEVELOPER</span>
          </div>

          {/* Oversized Name Headline with Halftone Backing & Glitch */}
          <div className="relative">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter uppercase font-display leading-[0.92] text-white hover-glitch transition-all cursor-default select-none">
              SHUBHAM
              <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ededef] to-neutral-400"
                style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                }}
              >
                SHARMA
              </span>
            </h1>

            {/* Comic sound stamp sticker */}
            <div
              onClick={() => playComicSound('thwip')}
              className="absolute -top-4 right-4 sm:right-12 rotate-12 px-3 py-1 bg-[#e2252b] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg border-2 border-white cursor-pointer select-none hover:scale-110 active:scale-95 transition-transform"
              title="Click for comic sound effect!"
            >
              THWIP!
            </div>
          </div>

          {/* Hero Tagline */}
          <div className="space-y-2">
            <p
              className="text-xl sm:text-2xl font-bold tracking-tight uppercase font-display text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(to right, ${primaryColor}, #ffffff, ${secondaryColor})`,
              }}
            >
              "CODE IS LOGIC. DESIGN IS FEELING."
            </p>
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed">
              An aspiring software developer exploring the intersection of technology, visual creativity, and interactive experiences. Crafting algorithms with structure and interfaces with soul.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => {
                playComicSound('thwip');
                onExploreWork();
              }}
              className="px-6 py-3.5 text-sm font-bold tracking-wider uppercase text-white rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
              style={{ backgroundColor: primaryColor }}
            >
              <span>EXPLORE MY WORK</span>
              <span className="text-xs">→</span>
            </button>

            <button
              onClick={() => {
                playComicSound('zap');
                onEnterPlayground();
              }}
              className="px-6 py-3.5 text-sm font-bold tracking-wider uppercase text-neutral-200 bg-[#12121a] hover:bg-[#1a1a24] border border-white/15 rounded-xl shadow transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#00d4ff]" />
              <span>ENTER THE PLAYGROUND</span>
            </button>

            <button
              onClick={() => {
                playComicSound('click');
                onContactMe();
              }}
              className="px-5 py-3.5 text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              CONTACT ME
            </button>
          </div>
        </div>

        {/* Right Column: Single Focused Interactive Multiverse Portrait (5 cols) */}
        <div className="lg:col-span-5 relative z-10 flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border-2 border-white/15 bg-[#101016] shadow-2xl p-2 group">
            {/* Halftone texture overlay */}
            <div className="absolute inset-0 halftone-bg opacity-30 pointer-events-none z-10" />

            {/* Comic Frame Corner Markers */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/60 pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/60 pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/60 pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/60 pointer-events-none z-20" />

            {/* Portrait Image Container (Switches between the two photos) */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-neutral-900 flex flex-col items-center justify-between">
              {activePortrait === 'sunglasses' ? (
                /* Photo 1: Sunglasses Multiverse Portrait */
                <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={customSunglassesSrc || PERSONAL_INFO.uploadedPortraitUrl}
                    alt="Shubham Sharma — Sunglasses Multiverse Portrait"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-[#00d4ff] text-black shadow-md">
                      SUNGLASSES · MULTIVERSE
                    </span>
                  </div>
                </div>
              ) : (
                /* Photo 2: Formal / Alternate Dimension Portrait */
                <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={customFormalSrc || PERSONAL_INFO.uploadedPortraitUrl}
                    alt="Shubham Sharma — Formal Dimensional Portrait"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 contrast-115 saturate-[0.85]"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded bg-[#e2252b] text-white shadow-md">
                      FORMAL · ACADEMIC DIMENSION
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Scrim & Dimension Switch Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex items-center justify-between z-20">
                <div>
                  <span className="text-xs font-bold font-display text-white block">
                    {activePortrait === 'sunglasses' ? 'Shades Multiverse Reveal' : 'Formal Academic Canvas'}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 block">
                    {activePortrait === 'sunglasses' ? 'Earth-1610 Creative Dimension' : 'Earth-65 Engineering Core'}
                  </span>
                </div>

                <button
                  onClick={handlePortraitToggle}
                  className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-white/15 hover:bg-white/25 rounded-md border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
                  title="Switch dimension between Formal and Sunglasses portrait"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#00d4ff]" />
                  <span>Switch Dimension</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick upload instructions badge */}
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>Real photos preserved</span>
            <span>·</span>
            <button
              onClick={() => setShowUploadModal(true)}
              className="text-[#00d4ff] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Upload className="w-3 h-3" />
              Configure Photo Files
            </button>
          </div>
        </div>
      </div>

      {/* Full-width KPI / Focus Strip (Below the split as per guidelines) */}
      <div className="w-full mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
            ACADEMIC DEGREE
          </span>
          <span className="text-base sm:text-lg font-bold text-white font-display">
            B.Tech CSE (2023–2027)
          </span>
          <p className="text-xs text-neutral-400 mt-0.5">AIMT Lucknow, India</p>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
            CORE FOUNDATION
          </span>
          <span className="text-base sm:text-lg font-bold text-white font-display">
            Python 75% Score
          </span>
          <p className="text-xs text-neutral-400 mt-0.5">IIT Bombay Spoken Tutorial (4 Credits)</p>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
            FEATURED PROJECTS
          </span>
          <span className="text-base sm:text-lg font-bold text-white font-display">
            Student Sys & CrickVerse
          </span>
          <p className="text-xs text-neutral-400 mt-0.5">Python, OOP, Database & Logic</p>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
            CREATIVE ARTS
          </span>
          <span className="text-base sm:text-lg font-bold text-white font-display">
            3x Singing Gold Medals
          </span>
          <p className="text-xs text-neutral-400 mt-0.5">Badminton Medals & Singing Coordinator</p>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="flex justify-center mt-6">
        <button
          onClick={onExploreWork}
          className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span>SCROLL TO ENTER MULTIVERSE</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[#e2252b]" />
        </button>
      </div>

      {/* Photo Files Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#111118] border border-white/20 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#e2252b]" />
                Configure Shubham's Photographs
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-neutral-400 hover:text-white text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              As requested, you can use your actual uploaded formal and sunglasses portraits. You can either select them from your device right now to preview instantly, or place the files in your project directory:
            </p>

            <div className="p-3 bg-black/40 rounded-lg border border-white/10 font-mono text-xs text-neutral-300 space-y-1">
              <div>Formal Portrait path: <code className="text-[#00d4ff]">/public/portrait_formal.jpg</code></div>
              <div>Sunglasses Portrait path: <code className="text-[#00d4ff]">/public/portrait_sunglasses.jpg</code></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                <span className="text-xs font-semibold text-white block">1. Formal Portrait</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'formal')}
                  className="text-xs text-neutral-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#e2252b] file:text-white hover:file:bg-[#c51c22] cursor-pointer"
                />
                {customFormalSrc && <span className="text-[11px] text-emerald-400 block font-mono">✓ Custom formal image loaded</span>}
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                <span className="text-xs font-semibold text-white block">2. Sunglasses Portrait</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'sunglasses')}
                  className="text-xs text-neutral-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#00d4ff] file:text-black hover:file:bg-[#00b8e6] cursor-pointer"
                />
                {customSunglassesSrc && <span className="text-[11px] text-emerald-400 block font-mono">✓ Custom shades image loaded</span>}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
              >
                Apply & Return to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
