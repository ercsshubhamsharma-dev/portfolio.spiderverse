import React, { useState } from 'react';
import { ExternalLink, Github, ChevronRight, CheckCircle2, Users, Database, Activity, Landmark } from 'lucide-react';
import { REAL_PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { playComicSound } from '../utils/audio';

interface ProjectsSectionProps {
  primaryColor: string;
  secondaryColor: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  primaryColor,
  secondaryColor,
}) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const studentProject = REAL_PROJECTS.find((p) => p.id === 'student-management-system')!;
  const crickverseProject = REAL_PROJECTS.find((p) => p.id === 'crickverse')!;
  const bankProject = REAL_PROJECTS.find((p) => p.id === 'bank-management-system')!;

  return (
    <section id="work" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#e2252b]">
          <span className="w-2 h-2 rounded-full bg-[#e2252b]" />
          <span>PRODUCTION & ACADEMIC CASE STUDIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
          FEATURED WORK
        </h2>
        <p className="text-neutral-300 max-w-2xl text-base leading-relaxed">
          Real software applications engineered with clean code architecture, problem-solving objectives, and database persistence. Each project addresses practical operational needs.
        </p>
      </div>

      <div className="space-y-16">
        {/* LAYOUT 1: Large Editorial Split Feature — Student Management System */}
        <div className="bg-[#0f0f16] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual Cover Column (5 cols) */}
            <div className="lg:col-span-5 p-8 bg-gradient-to-br from-[#161622] via-[#0f0f16] to-[#0a0a0f] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 halftone-bg opacity-30 pointer-events-none" />

              <div className="space-y-3 z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-400">CASE STUDY // 01</span>
                  <span className="text-xs font-mono text-[#e2252b] bg-[#e2252b]/10 px-2 py-0.5 rounded font-bold">
                    {studentProject.category}
                  </span>
                </div>
                <h3 className="text-3xl font-black font-display text-white">
                  {studentProject.title}
                </h3>
                <p className="text-sm text-neutral-300 font-normal">
                  {studentProject.subtitle}
                </p>
              </div>

              {/* Procedural Mockup Illustration */}
              <div className="my-8 p-4 bg-black/60 rounded-2xl border border-white/10 space-y-3 z-10 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs font-mono text-neutral-400">
                  <span className="flex items-center gap-1.5 text-white">
                    <Database className="w-3.5 h-3.5 text-[#e2252b]" />
                    Student Database Directory
                  </span>
                  <span className="text-emerald-400 font-bold">SQLITE CONNECTED</span>
                </div>
                <div className="space-y-1.5 font-mono text-[11px] text-neutral-300">
                  <div className="flex justify-between p-1.5 bg-white/5 rounded">
                    <span>Roll: 23AIMTCSE042</span>
                    <span className="text-white font-semibold">Shubham S.</span>
                    <span className="text-[#00d4ff]">Sem IV</span>
                  </div>
                  <div className="flex justify-between p-1.5 bg-white/5 rounded">
                    <span>Roll: 23AIMTCSE019</span>
                    <span className="text-white">Aditya K.</span>
                    <span className="text-[#00d4ff]">Sem IV</span>
                  </div>
                  <div className="flex justify-between p-1.5 bg-white/5 rounded">
                    <span>Roll: 23AIMTCSE058</span>
                    <span className="text-white">Pooja M.</span>
                    <span className="text-[#00d4ff]">Sem IV</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between z-10">
                <span className="text-xs font-mono text-neutral-400">
                  Timeline: {studentProject.timeline}
                </span>
                <button
                  onClick={() => {
                    playComicSound('thwip');
                    setSelectedCaseStudy(studentProject);
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#e2252b] hover:bg-[#c51c22] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Expand Full Case Study
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Editorial Content Column (7 cols) */}
            <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                    THE PROBLEM & CONTEXT
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {studentProject.problem}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#00d4ff] mb-2">
                    CORE ENGINEERING OBJECTIVE
                  </h4>
                  <p className="text-sm text-neutral-200 leading-relaxed">
                    {studentProject.objective}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                    KEY SYSTEM HIGHLIGHTS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {studentProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies & Actions */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {studentProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-neutral-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {studentProject.githubUrl && (
                    <a
                      href={studentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 text-neutral-300 hover:text-white border border-white/15 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 text-xs font-mono"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LAYOUT 2: Horizontal Dynamic Visual Feature — CrickVerse */}
        <div className="bg-[#0f0f16] border border-white/15 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-neutral-400">CASE STUDY // 02</span>
                <span className="text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded font-bold">
                  {crickverseProject.category}
                </span>
              </div>
              <h3 className="text-3xl font-black font-display text-white">
                {crickverseProject.title}
              </h3>
              <p className="text-sm text-neutral-300 mt-1">
                {crickverseProject.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  playComicSound('zap');
                  setSelectedCaseStudy(crickverseProject);
                }}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-[#00d4ff] hover:bg-[#00bfe6] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                Inspect CrickVerse Case Study
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
            {/* Description & Metrics (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {crickverseProject.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-[#00d4ff] block uppercase">
                    Mathematical Algorithms
                  </span>
                  <span className="text-xs text-neutral-300 block">
                    Dynamic Run Rate calculations, Required Run Rate (RRR) projections, and match momentum indexes.
                  </span>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-xs font-mono text-[#e2252b] block uppercase">
                    Data Logic & Structures
                  </span>
                  <span className="text-xs text-neutral-300 block">
                    Structured Python lists & tuples tracking ball-by-ball bowler economy and batter strike rates.
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {crickverseProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-neutral-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Scorecard UI Mockup (5 cols) */}
            <div className="lg:col-span-5 p-5 bg-black/70 rounded-2xl border border-white/10 space-y-3 font-mono shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#00d4ff]" />
                  <span className="text-xs font-bold text-white">CRICKVERSE MATCH ENGINE</span>
                </div>
                <span className="text-[10px] bg-red-600/30 text-red-400 px-2 py-0.5 rounded font-bold">
                  LIVE INNINGS
                </span>
              </div>

              <div className="p-3 bg-neutral-900/90 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block">INDIA INNINGS</span>
                  <span className="text-2xl font-black font-display text-white">186/4</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block">OVERS (18.2)</span>
                  <span className="text-xs text-[#00d4ff] font-bold">CRR: 10.15 · RRR: 7.80</span>
                </div>
              </div>

              <div className="text-[11px] text-neutral-300 space-y-1 pt-1">
                <div className="flex justify-between">
                  <span>S. Sharma (c)</span>
                  <span className="text-white font-bold">48* (24) SR: 200.0</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Current Bowler</span>
                  <span>3.2-0-28-2 Econ: 8.4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LAYOUT 3: Collaborative Team Architecture — Bank Management System */}
        <div className="bg-[#0f0f16] border border-white/15 rounded-3xl p-8 lg:p-10 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-neutral-400">CASE STUDY // 03</span>
                <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-bold">
                  {bankProject.category}
                </span>
              </div>
              <h3 className="text-3xl font-black font-display text-white">
                {bankProject.title}
              </h3>
              <p className="text-sm text-neutral-300 mt-1">
                {bankProject.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-400 flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                Team College Project
              </span>
              <button
                onClick={() => {
                  playComicSound('bam');
                  setSelectedCaseStudy(bankProject);
                }}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                Expand Bank Case Study
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-sm text-neutral-300 leading-relaxed">
                {bankProject.description}
              </p>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  TEAM ROLES & SHUBHAM'S CONTRIBUTION
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                  Engineered the core transactional consistency logic, atomic balance deductions, and PIN authentication attempts counter. Collaborated with college teammates on module boundaries, test cases, and ledger recording.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {bankProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-neutral-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-black/60 p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-white font-bold">
                <Landmark className="w-4 h-4 text-purple-400" />
                <span>Security & State Ledger</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-neutral-300">
                <div className="flex justify-between">
                  <span>Auth Mechanism:</span>
                  <span className="text-emerald-400">Salted PIN Hash</span>
                </div>
                <div className="flex justify-between">
                  <span>Balance Guard:</span>
                  <span className="text-emerald-400">Zero Overdraft Check</span>
                </div>
                <div className="flex justify-between">
                  <span>Audit Trail:</span>
                  <span className="text-emerald-400">Timestamped Logs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#111118] border border-white/20 rounded-2xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#e2252b] block uppercase">
                  {selectedCaseStudy.category} · {selectedCaseStudy.timeline}
                </span>
                <h3 className="text-2xl font-black font-display text-white mt-1">
                  {selectedCaseStudy.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="text-neutral-400 hover:text-white text-sm cursor-pointer p-2"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-mono uppercase text-neutral-400 mb-1">
                  1. Problem Statement
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                  {selectedCaseStudy.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[#00d4ff] mb-1">
                  2. Technical Objective
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                  {selectedCaseStudy.objective}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-neutral-400 mb-2">
                  3. Key Highlights & Implementation Details
                </h4>
                <ul className="space-y-2">
                  {selectedCaseStudy.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                      <span className="text-[#e2252b] font-bold">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-neutral-400 mb-2">
                  4. Tech Stack Breakdown
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-white bg-black/60 px-3 py-1.5 rounded-lg border border-white/15"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {selectedCaseStudy.githubUrl && (
                <a
                  href={selectedCaseStudy.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View GitHub Profile
                </a>
              )}
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="px-5 py-2 text-xs font-semibold bg-[#e2252b] text-white rounded-lg hover:bg-[#c51c22] transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
