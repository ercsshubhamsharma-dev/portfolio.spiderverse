import React, { useState } from 'react';
import { Code, Terminal, Palette, Wrench, Plus, Check } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SkillCategory } from '../types';
import { playComicSound } from '../utils/audio';

interface SkillsSectionProps {
  primaryColor: string;
  secondaryColor: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  primaryColor,
  secondaryColor,
}) => {
  const [categories, setCategories] = useState<SkillCategory[]>(SKILL_CATEGORIES);
  const [activeCodeSnippet, setActiveCodeSnippet] = useState<string | null>(
    categories[0].skills[0].snippet || null
  );
  const [activeSkillName, setActiveSkillName] = useState<string>(categories[0].skills[0].name);

  // Dynamic add tool dialog
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillCategory, setNewSkillCategory] = useState('Creative & Development Tools');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillTag, setNewSkillTag] = useState('');

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.title === newSkillCategory) {
          return {
            ...cat,
            skills: [
              ...cat.skills,
              {
                name: newSkillName.trim(),
                level: 'Currently Learning',
                tags: newSkillTag.trim() ? [newSkillTag.trim()] : ['Practical Tooling'],
              },
            ],
          };
        }
        return cat;
      })
    );

    setNewSkillName('');
    setNewSkillTag('');
    setShowAddSkill(false);
    playComicSound('zap');
  };

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#00d4ff]">
            <Code className="w-3.5 h-3.5" />
            <span>HONEST CAPABILITIES MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
            TECHNICAL & CREATIVE SKILLS
          </h2>
          <p className="text-neutral-300 max-w-2xl text-base leading-relaxed">
            Represented with technical honesty—no fabricated 99% progress bars. A grounded combination of programming foundations, syntax control, and visual design toolsets.
          </p>
        </div>

        <button
          onClick={() => {
            setShowAddSkill(true);
            playComicSound('click');
          }}
          className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-[#00d4ff]" />
          <span>Add Tool / Skill</span>
        </button>
      </div>

      {/* Main Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Skill Category Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-[#0f0f16] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{
                      backgroundColor:
                        cat.title.includes('Programming')
                          ? primaryColor
                          : cat.title.includes('Web')
                          ? secondaryColor
                          : cat.title.includes('Fundamental')
                          ? '#8b5cf6'
                          : '#f59e0b',
                    }}
                  />
                  <h3 className="text-base font-bold font-display text-white">
                    {cat.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  {cat.skills.length} competencies
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.skills.map((skill) => {
                  const isSelected = activeSkillName === skill.name;
                  return (
                    <div
                      key={skill.name}
                      onClick={() => {
                        setActiveSkillName(skill.name);
                        if (skill.snippet) setActiveCodeSnippet(skill.snippet);
                        playComicSound('click');
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white/10 border-white/30 shadow-md'
                          : 'bg-black/40 border-white/5 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold font-display text-white">
                          {skill.name}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {skill.level}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Interactive Code & Fundamentals Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-[#0d0d14] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-xs font-mono font-bold text-white uppercase">
                Active Skill Syntax Inspector
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">● LIVE RUNNER</span>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-bold font-display text-white">
              Inspecting: <span className="text-[#00d4ff]">{activeSkillName}</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Click any skill on the left to review syntactical application, structural rules, and coding practices.
            </p>
          </div>

          <div className="p-4 bg-black/80 rounded-xl border border-white/10 font-mono text-xs text-neutral-300 space-y-2 overflow-x-auto shadow-inner">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-neutral-500">
              <span>// SYNTAX PREVIEW</span>
              <span>UTF-8 · INDENT 4</span>
            </div>
            <pre className="text-emerald-400 leading-relaxed text-[11px] whitespace-pre">
              {activeCodeSnippet ||
                `# Foundational concept representation
data_record = ("AIMT_CSE", 2027, "Shubham")
for item in data_record:
    print(f"Verified component: {item}")`}
            </pre>
          </div>

          {/* Quick CS Fundamentals Summary */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs">
            <span className="font-bold text-white block font-display">
              Applied CS Fundamentals
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-300">
              <span className="p-1 bg-black/40 rounded">✓ Variables & Types</span>
              <span className="p-1 bg-black/40 rounded">✓ Loops & Iteration</span>
              <span className="p-1 bg-black/40 rounded">✓ Conditional Flow</span>
              <span className="p-1 bg-black/40 rounded">✓ Lists & Tuples</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Skill Dialog Modal */}
      {showAddSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <form
            onSubmit={handleAddCustomSkill}
            className="bg-[#111118] border border-white/20 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-base font-bold font-display text-white">
                Add New Skill or Tool
              </h3>
              <button
                type="button"
                onClick={() => setShowAddSkill(false)}
                className="text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                ✕ Cancel
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-mono text-neutral-400 mb-1">Target Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full p-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-mono focus:border-[#00d4ff] outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.title} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-neutral-400 mb-1">Skill / Tool Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Figma, Tailwind, Git"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full p-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-mono focus:border-[#00d4ff] outline-none"
                >
                </input>
              </div>

              <div>
                <label className="block font-mono text-neutral-400 mb-1">Key Focus Tag</label>
                <input
                  type="text"
                  placeholder="e.g. Component Architecture"
                  value={newSkillTag}
                  onChange={(e) => setNewSkillTag(e.target.value)}
                  className="w-full p-2.5 bg-black/60 border border-white/15 rounded-lg text-white font-mono focus:border-[#00d4ff] outline-none"
                >
                </input>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddSkill(false)}
                className="px-4 py-2 text-xs font-mono text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#e2252b] hover:bg-[#c51c22] rounded-lg transition-colors cursor-pointer"
              >
                Save Skill
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
