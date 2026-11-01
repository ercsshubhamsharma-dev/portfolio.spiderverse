import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Palette, Move, MousePointer, Volume2, RefreshCw } from 'lucide-react';
import { MULTIVERSE_THEMES } from '../data/portfolioData';
import { MultiverseTheme } from '../types';
import { playComicSound } from '../utils/audio';

interface DesignPlaygroundProps {
  currentTheme: MultiverseTheme;
  onSelectTheme: (theme: MultiverseTheme) => void;
}

export const DesignPlayground: React.FC<DesignPlaygroundProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  // Playground state
  const [skewAmount, setSkewAmount] = useState(0);
  const [trackingAmount, setTrackingAmount] = useState(0);
  const [lastSoundTriggered, setLastSoundTriggered] = useState<string | null>(null);
  const [customCursorActive, setCustomCursorActive] = useState(false);

  // Elastic Spider Web Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webNodesRef = useRef<{ x: number; y: number; ox: number; oy: number; vx: number; vy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = 360);

    // Initialize web anchor nodes
    const nodes: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];
    const nodeCount = 14;
    const cx = width / 2;
    const cy = height / 2;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 60 + (i % 3) * 35;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      nodes.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
    }
    webNodesRef.current = nodes;

    let pointerX = -9999;
    let pointerY = -9999;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseleave', () => {
      pointerX = -9999;
      pointerY = -9999;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Web center hub
      ctx.fillStyle = currentTheme.primaryRed;
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Physics update on nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Interaction with pointer
        const dx = pointerX - n.x;
        const dy = pointerY - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          const force = (1 - dist / 100) * 8;
          n.vx -= (dx / dist) * force;
          n.vy -= (dy / dist) * force;
        }

        // Hooke's Law spring back to origin
        const k = 0.08;
        const damping = 0.84;
        n.vx += (n.ox - n.x) * k;
        n.vy += (n.oy - n.y) * k;
        n.vx *= damping;
        n.vy *= damping;
        n.x += n.vx;
        n.y += n.vy;

        // Draw radial spokes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();

        // Connect adjacent nodes
        const nextNode = nodes[(i + 1) % nodes.length];
        ctx.strokeStyle = currentTheme.primaryBlue;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.stroke();

        // If pointer is close, draw elastic dynamic strand to cursor!
        if (dist < 120) {
          ctx.strokeStyle = currentTheme.primaryRed;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointerX, pointerY);
          ctx.stroke();
        }

        // Draw node bead
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handlePointerMove);
    };
  }, [currentTheme]);

  const soundButtons: Array<{ label: string; sound: 'thwip' | 'bam' | 'zap'; color: string }> = [
    { label: 'THWIP!', sound: 'thwip', color: '#e2252b' },
    { label: 'BAM!', sound: 'bam', color: '#f59e0b' },
    { label: 'ZAP!', sound: 'zap', color: '#00d4ff' },
  ];

  return (
    <section id="playground" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#00d4ff]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EXPERIMENTAL INTERACTION LAB</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
          THE PLAYGROUND
        </h2>
        <p className="text-neutral-300 max-w-2xl text-base leading-relaxed">
          Design is not just static pixels—it’s how an interface responds, rebounds, and breathes. Explore real-time interactive physics, kinetic typography, multiverse palettes, and comic sound synthesis.
        </p>
      </div>

      {/* Playground Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Module 1: Interactive Elastic Web Strand Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f0f15] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 z-10">
            <div>
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-[#00d4ff]" />
                Elastic Spider-Web Physics
              </h3>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                Hover or drag over the canvas to pull and deform web tension strands
              </p>
            </div>
            <button
              onClick={() => {
                playComicSound('thwip');
                // Nudge random node
                if (webNodesRef.current.length > 0) {
                  const idx = Math.floor(Math.random() * webNodesRef.current.length);
                  webNodesRef.current[idx].vx = (Math.random() - 0.5) * 20;
                  webNodesRef.current[idx].vy = (Math.random() - 0.5) * 20;
                }
              }}
              className="p-2 text-neutral-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              title="Snap Web Strands"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <div className="relative w-full h-[320px] my-3 rounded-xl overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
            <div className="absolute top-3 left-3 text-[11px] font-mono text-neutral-500 pointer-events-none">
              SPRING DYNAMICS · HOOKE'S CONSTANT k=0.08
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-3 border-t border-white/5">
            <span>Tension strands: 14 Nodes</span>
            <span className="text-[#e2252b]">Interactive pointer attraction active</span>
          </div>
        </div>

        {/* Module 2: Multiverse Palette Explorer (5 cols) */}
        <div className="lg:col-span-5 bg-[#0f0f15] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Palette className="w-4 h-4 text-[#e2252b]" />
                Multiverse Palette Explorer
              </h3>
              <span className="text-xs font-mono text-neutral-400">Click to switch</span>
            </div>
            <p className="text-xs text-neutral-300 mt-3 leading-relaxed">
              In the Spider-Verse, every universe has its own distinct emotional color temperature. Select a dimension below to dynamically shift the entire portfolio's color grade:
            </p>
          </div>

          <div className="space-y-2.5 my-4">
            {MULTIVERSE_THEMES.map((theme) => {
              const isSelected = currentTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme);
                    playComicSound('zap');
                  }}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 border-white/40 shadow-lg scale-[1.01]'
                      : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold font-display text-white block">
                      {theme.name}
                    </span>
                    <span className="text-[11px] text-neutral-400 block">
                      {theme.description}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.primaryRed }}
                    />
                    <span
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: theme.primaryBlue }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-neutral-400 pt-3 border-t border-white/5 flex items-center justify-between">
            <span>Active Universe:</span>
            <span className="text-white font-semibold">{currentTheme.universe}</span>
          </div>
        </div>

        {/* Module 3: Kinetic Typography & Skew Matrix (6 cols) */}
        <div className="lg:col-span-6 bg-[#0f0f15] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <h3 className="text-lg font-bold font-display text-white mb-2">
              Kinetic Typography & Chromatic Skew
            </h3>
            <p className="text-xs text-neutral-400 font-mono mb-4">
              Adjust horizontal skew and letter tracking to explore comic title card geometry
            </p>

            {/* Kinetic Text Preview Box */}
            <div className="p-6 bg-black/60 rounded-xl border border-white/10 min-h-[140px] flex items-center justify-center overflow-hidden">
              <div
                className="text-center font-display font-black uppercase text-2xl sm:text-3xl text-white transition-all select-none"
                style={{
                  transform: `skewX(${skewAmount}deg)`,
                  letterSpacing: `${trackingAmount}px`,
                  textShadow: `${skewAmount * 0.4}px 0 ${currentTheme.primaryRed}, ${
                    -skewAmount * 0.4
                  }px 0 ${currentTheme.primaryBlue}`,
                }}
              >
                <span>LEAP OF FAITH</span>
                <span className="block text-xs font-mono tracking-widest text-[#00d4ff] mt-1">
                  DIMENSIONAL ACCELERATION
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-4 pt-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                <span>Skew Angle</span>
                <span>{skewAmount}°</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                value={skewAmount}
                onChange={(e) => setSkewAmount(Number(e.target.value))}
                className="w-full accent-[#e2252b] cursor-ew-resize"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-300 mb-1">
                <span>Letter Tracking</span>
                <span>{trackingAmount}px</span>
              </div>
              <input
                type="range"
                min="-2"
                max="18"
                value={trackingAmount}
                onChange={(e) => setTrackingAmount(Number(e.target.value))}
                className="w-full accent-[#00d4ff] cursor-ew-resize"
              />
            </div>
          </div>
        </div>

        {/* Module 4: Comic Sound Effect Synthesizer (6 cols) */}
        <div className="lg:col-span-6 bg-[#0f0f15] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#e2252b]" />
                Comic Sound Effect Synthesizer
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">Web Audio API</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              Procedurally synthesized audio waves. No MP3 files—every punch, whoosh, and web-shooter click is generated live through harmonic oscillator nodes:
            </p>

            {/* Sound Action Buttons */}
            <div className="grid grid-cols-3 gap-3 my-4">
              {soundButtons.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => {
                    playComicSound(btn.sound);
                    setLastSoundTriggered(btn.label);
                  }}
                  className="py-5 px-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 hover:scale-105 active:scale-95 transition-all text-center cursor-pointer shadow-lg group"
                >
                  <span
                    className="text-xl sm:text-2xl font-black font-display uppercase block tracking-wider group-hover:scale-110 transition-transform"
                    style={{ color: btn.color }}
                  >
                    {btn.label}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase mt-1 block">
                    {btn.sound} synth
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Status:</span>
            <span className="text-white">
              {lastSoundTriggered ? `Last Triggered: ${lastSoundTriggered}` : 'Ready to synthesize'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
