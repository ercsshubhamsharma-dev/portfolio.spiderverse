import React, { useState } from 'react';
import { Award, Music, Trophy, ShieldCheck, Activity, Volume2, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { playComicSound } from '../utils/audio';

interface AchievementsSectionProps {
  primaryColor: string;
  secondaryColor: string;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  primaryColor,
  secondaryColor,
}) => {
  const [activeFrequency, setActiveFrequency] = useState<number>(440);
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);

  // Musical notes for vocal demonstration (Sa Re Ga Ma Pa Dha Ni Sa / C D E F G A B C)
  const vocalNotes = [
    { label: 'Sa (C4)', freq: 261.63 },
    { label: 'Re (D4)', freq: 293.66 },
    { label: 'Ga (E4)', freq: 329.63 },
    { label: 'Ma (F4)', freq: 349.23 },
    { label: 'Pa (G4)', freq: 392.0 },
    { label: 'Dha (A4)', freq: 440.0 },
    { label: 'Ni (B4)', freq: 493.88 },
    { label: 'Sa (C5)', freq: 523.25 },
  ];

  const handlePlayNote = (freq: number) => {
    setActiveFrequency(freq);
    playComicSound('note', freq);
  };

  const playVocalArpeggio = () => {
    setIsPlayingMelody(true);
    vocalNotes.forEach((n, idx) => {
      setTimeout(() => {
        setActiveFrequency(n.freq);
        playComicSound('note', n.freq);
        if (idx === vocalNotes.length - 1) {
          setTimeout(() => setIsPlayingMelody(false), 500);
        }
      }, idx * 160);
    });
  };

  return (
    <section id="achievements" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-amber-400">
          <Award className="w-3.5 h-3.5" />
          <span>BEYOND THE CODE · CULTURAL & ATHLETIC EXCELLENCE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
          CREATIVE ACHIEVEMENTS
        </h2>
        <p className="text-neutral-300 max-w-2xl text-base leading-relaxed">
          Artistry, stage discipline, and competitive athletic drive. The qualities that foster focus in software engineering begin on the stage and on the sports court.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Featured Left Card: 3x Gold Medals in Singing + Interactive Synthesizer (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f0f16] border border-white/15 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                <Music className="w-4 h-4 text-amber-400" />
                Vocal Performance & College Coordination
              </span>
              <span className="text-xs font-mono text-white bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                3x Gold Medalist
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
              Inter-College Vocal Gold Medals & College Singing Coordinator
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Earned three first-place Gold Medals across competitive inter-college singing championships. Entrusted as the official College Singing Coordinator at AIMT Lucknow, overseeing student vocal training, audition panels, and live festival choreography.
            </p>

            {/* Interactive Pitch Visualizer Box */}
            <div className="p-5 bg-black/70 rounded-2xl border border-white/10 space-y-4 shadow-inner">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1 text-white">
                  <Volume2 className="w-3.5 h-3.5 text-[#00d4ff]" />
                  Acoustic Pitch & Scale Visualizer
                </span>
                <span className="text-amber-400 font-bold">{Math.round(activeFrequency)} Hz</span>
              </div>

              {/* Dynamic waveform simulation bars */}
              <div className="flex items-end justify-between h-14 px-2 bg-neutral-900/60 rounded-xl border border-white/5 py-2">
                {[40, 65, 85, 100, 75, 55, 90, 60, 80, 95, 70, 50, 85, 60].map((height, i) => {
                  const factor = Math.sin((activeFrequency / 100) + i) * 0.5 + 0.5;
                  const barH = Math.max(12, height * factor);
                  return (
                    <div
                      key={i}
                      className="w-2 rounded-t-sm transition-all duration-150"
                      style={{
                        height: `${barH}%`,
                        backgroundColor: i % 2 === 0 ? '#e2252b' : '#00d4ff',
                      }}
                    />
                  );
                })}
              </div>

              {/* Piano / Vocal Note Keys */}
              <div>
                <span className="text-[11px] font-mono text-neutral-400 block mb-2">
                  Click musical notes to test synthesized pitch harmony:
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {vocalNotes.map((n) => (
                    <button
                      key={n.label}
                      onClick={() => handlePlayNote(n.freq)}
                      className={`py-2 px-1 rounded-lg text-center text-xs font-mono border transition-all cursor-pointer ${
                        activeFrequency === n.freq
                          ? 'bg-amber-400 text-black font-bold border-amber-300 shadow'
                          : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/15'
                      }`}
                    >
                      {n.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  onClick={playVocalArpeggio}
                  disabled={isPlayingMelody}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#e2252b] to-[#00d4ff] hover:opacity-90 rounded-lg transition-opacity flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isPlayingMelody ? 'Playing Arpeggio...' : 'Play Vocal Scale'}
                </button>
                <span className="text-[11px] font-mono text-neutral-400">
                  Classical Indian & Western Vocal Training
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Badminton, Discipline & Interests (5 cols) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Badminton Card */}
          <div className="bg-[#0f0f16] border border-white/10 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-emerald-400" />
                Inter-College Badminton
              </span>
              <span className="text-xs font-mono text-white bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                1 Gold · 1 Silver
              </span>
            </div>
            <h4 className="text-xl font-bold font-display text-white">
              Tournament Medals in Badminton
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Secured 1 Gold Medal and 1 Silver Medal in inter-college competitive badminton fixtures. Fast-paced footwork, tactical smashes, and stamina that translates directly into disciplined software problem solving.
            </p>
          </div>

          {/* Discipline Volunteer Card */}
          <div className="bg-[#0f0f16] border border-white/10 rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono text-[#00d4ff] font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00d4ff]" />
                Campus Leadership
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Volunteer Role
              </span>
            </div>
            <h4 className="text-xl font-bold font-display text-white">
              Discipline Volunteer for College Activities
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Trusted student discipline leader for AIMT college events, managing logistical coordination, participant security, protocol enforcement, and smooth stage operations during major fests.
            </p>
          </div>

          {/* Core Personal Interests */}
          <div className="bg-black/50 border border-white/10 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#e2252b]" />
              Core Interests & Passions
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                🏏 Cricket & Strategic Analytics
              </span>
              <span className="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                🏸 Competitive Badminton
              </span>
              <span className="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-lg border border-white/10">
                🎤 Classical & Stage Singing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
