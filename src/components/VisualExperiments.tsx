import React, { useState } from 'react';
import { Sparkles, Code2, Layers, Cpu, Eye, Info } from 'lucide-react';
import { VISUAL_EXPERIMENTS } from '../data/portfolioData';
import { VisualExperiment } from '../types';
import { playComicSound } from '../utils/audio';

interface VisualExperimentsProps {
  primaryColor: string;
  secondaryColor: string;
}

export const VisualExperiments: React.FC<VisualExperimentsProps> = ({
  primaryColor,
  secondaryColor,
}) => {
  const [selectedExperiment, setSelectedExperiment] = useState<VisualExperiment | null>(null);
  const [dotDensity, setDotDensity] = useState(16);
  const [chromaticOffset, setChromaticOffset] = useState(4);
  const [lightAngle, setLightAngle] = useState(45);
  const [hudTargeting, setHudTargeting] = useState(true);

  return (
    <section id="experiments" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#00d4ff]">
            <Layers className="w-3.5 h-3.5" />
            <span>MY CREATIVE LAB · EXPERIMENTAL GALLERY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
            VISUAL EXPERIMENTS
          </h2>
          <p className="text-neutral-300 max-w-2xl text-base leading-relaxed">
            Original investigations into digital aesthetics, comic book print mechanics, and procedural graphic algorithms. Labeled honestly as self-directed visual and technical studies.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 bg-white/5 p-3 rounded-xl border border-white/10 max-w-xs">
          <span className="text-[#e2252b] font-bold block mb-0.5">HONEST ATTRIBUTION:</span>
          All artifacts here are personal creative explorations and code experiments, not commercial client work.
        </div>
      </div>

      {/* Experiments Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VISUAL_EXPERIMENTS.map((exp) => (
          <div
            key={exp.id}
            className="group relative bg-[#0f0f15] border border-white/10 hover:border-white/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-neutral-400">{exp.label}</span>
              <span className="text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded">
                {exp.category}
              </span>
            </div>

            {/* Interactive Visual Canvas Presentation */}
            <div className="my-5 w-full h-52 rounded-xl overflow-hidden bg-black/80 border border-white/10 relative flex items-center justify-center p-4">
              {exp.interactiveType === 'halftone' && (
                <div
                  className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundImage: `radial-gradient(rgba(226,37,43,0.3) 2px, transparent 2px), radial-gradient(rgba(0,212,255,0.3) 2px, transparent 2px)`,
                    backgroundSize: `${dotDensity}px ${dotDensity}px`,
                    backgroundPosition: `0 0, ${chromaticOffset}px ${chromaticOffset}px`,
                  }}
                >
                  <div
                    className="font-display font-black text-3xl uppercase tracking-tighter text-white select-none"
                    style={{
                      textShadow: `${chromaticOffset}px 0 #e2252b, -${chromaticOffset}px 0 #00d4ff`,
                    }}
                  >
                    HALFTONE DOTS
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 mt-2">
                    SCREEN MATRIX {dotDensity}px · OFFSET {chromaticOffset}px
                  </div>
                </div>
              )}

              {exp.interactiveType === 'kinetic-type' && (
                <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
                  <div className="space-y-1 text-center font-display font-black text-2xl uppercase tracking-wider text-white">
                    <div className="text-[#e2252b] -skew-x-12 hover:skew-x-0 transition-transform">
                      PARALLEL
                    </div>
                    <div className="text-white skew-x-6 hover:skew-x-0 transition-transform">
                      UNIVERSES
                    </div>
                    <div className="text-[#00d4ff] -skew-x-6 hover:skew-x-0 transition-transform">
                      COLLIDE
                    </div>
                  </div>
                </div>
              )}

              {exp.interactiveType === 'red-blue' && (
                <div
                  className="w-full h-full rounded-lg relative overflow-hidden flex items-center justify-center"
                  style={{
                    background: `linear-gradient(${lightAngle}deg, rgba(226,37,43,0.6) 0%, rgba(12,12,18,0.9) 50%, rgba(0,212,255,0.6) 100%)`,
                  }}
                >
                  <div className="w-20 h-20 rounded-full border-2 border-white/60 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e2252b] to-[#00d4ff] animate-pulse" />
                  </div>
                </div>
              )}

              {exp.interactiveType === '3d-torus' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  {/* Procedural Torus Knot SVG Vector representation */}
                  <svg viewBox="0 0 100 100" className="w-28 h-28 text-[#00d4ff] animate-spin" style={{ animationDuration: '24s' }}>
                    <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="22" fill="none" stroke="#e2252b" strokeWidth="1" strokeDasharray="5 2" />
                    <ellipse cx="50" cy="50" rx="38" ry="16" fill="none" stroke="white" strokeWidth="0.8" opacity="0.6" transform="rotate(45 50 50)" />
                    <ellipse cx="50" cy="50" rx="38" ry="16" fill="none" stroke="white" strokeWidth="0.8" opacity="0.6" transform="rotate(-45 50 50)" />
                  </svg>
                  <span className="text-[10px] font-mono text-neutral-400 mt-1">Parametric Orbit</span>
                </div>
              )}

              {exp.interactiveType === 'comic-panel' && (
                <div className="w-full h-full grid grid-cols-2 gap-1.5 p-1 bg-white/10 rounded-lg">
                  <div className="bg-[#12121a] border border-black p-2 flex flex-col justify-between">
                    <span className="text-[9px] font-mono font-bold bg-[#e2252b] text-white px-1 self-start">
                      PANEL 01
                    </span>
                    <span className="text-xs font-display font-black text-white">"WHAT IF...?"</span>
                  </div>
                  <div className="bg-[#12121a] border border-black p-2 flex flex-col justify-between halftone-bg">
                    <span className="text-[9px] font-mono font-bold bg-[#00d4ff] text-black px-1 self-start">
                      PANEL 02
                    </span>
                    <span className="text-xs font-display font-black text-[#00d4ff]">"ANYONE CAN WEAR THE MASK."</span>
                  </div>
                </div>
              )}

              {exp.interactiveType === 'hud-shooter' && (
                <div className="w-full h-full flex flex-col items-center justify-center relative font-mono text-xs text-[#00d4ff]">
                  <div className="w-28 h-28 rounded-full border border-[#00d4ff]/40 flex items-center justify-center relative">
                    <div className="absolute inset-x-0 h-px bg-[#00d4ff]/30" />
                    <div className="absolute inset-y-0 w-px bg-[#00d4ff]/30" />
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#e2252b] animate-spin" style={{ animationDuration: '8s' }} />
                    <span className="absolute -bottom-4 text-[9px] font-mono text-white">PSI: 240 // LOCKED</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description & Tech Stack */}
            <div className="space-y-2 mb-4">
              <h3 className="text-lg font-bold font-display text-white group-hover:text-[#00d4ff] transition-colors">
                {exp.title}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {exp.description}
              </p>
            </div>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 pb-4 border-b border-white/5">
              {exp.technologies.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono text-neutral-400 bg-black/40 px-2 py-0.5 rounded border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Inspect / Launch Button */}
            <div className="pt-3 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedExperiment(exp);
                  playComicSound('click');
                }}
                className="text-xs font-semibold text-white hover:text-[#00d4ff] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Inspect Experiment Specs</span>
              </button>

              <span className="text-xs font-mono text-neutral-500">
                Study {exp.id.replace('exp-', '#0')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Experiment Detail / Code Inspector Modal */}
      {selectedExperiment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#111118] border border-white/20 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#e2252b] font-bold">
                  {selectedExperiment.label}
                </span>
                <span className="text-neutral-500">/</span>
                <h3 className="text-lg font-bold font-display text-white">
                  {selectedExperiment.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExperiment(null)}
                className="text-neutral-400 hover:text-white text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              {selectedExperiment.description}
            </p>

            <div className="p-4 bg-black/70 rounded-xl border border-white/10 font-mono text-xs text-neutral-300 space-y-2">
              <div className="text-[#00d4ff] font-bold">// MATHEMATICAL & ARCHITECTURAL LOGIC:</div>
              <p className="text-[11px] text-neutral-400">
                Technologies utilized: {selectedExperiment.technologies.join(' · ')}
              </p>
              <pre className="p-2.5 bg-neutral-900 rounded text-emerald-400 overflow-x-auto text-[11px]">
{selectedExperiment.interactiveType === 'halftone'
  ? `// Halftone RGB channel displacement formula:
const r_offset = sin(angle) * chromaticDistance;
const g_offset = 0;
const b_offset = -sin(angle) * chromaticDistance;
ctx.drawImage(canvasR, x + r_offset, y);
ctx.drawImage(canvasB, x + b_offset, y);`
  : selectedExperiment.interactiveType === 'red-blue'
  ? `// Dual-channel complementary key lighting:
const keyLight = new THREE.DirectionalLight(0xe2252b, 2.5); // Crimson
const rimLight = new THREE.DirectionalLight(0x00d4ff, 2.8); // Electric Cyan
keyLight.position.set(10, 15, 10);
rimLight.position.set(-10, 10, -10);`
  : `// Procedural parametric geometry algorithm
const geom = new THREE.TorusKnotGeometry(1.6, 0.4, 128, 32);
const mat = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00d4ff });`}
              </pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-neutral-500">
                Personal Engineering Lab · Shubham Sharma
              </span>
              <button
                onClick={() => setSelectedExperiment(null)}
                className="px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
