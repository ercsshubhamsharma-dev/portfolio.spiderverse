import React, { useState } from 'react';
import { FileText, Download, Printer, Upload, Check, ExternalLink, GraduationCap, Award, Briefcase, Code } from 'lucide-react';
import { PERSONAL_INFO, REAL_PROJECTS, CERTIFICATIONS, ACHIEVEMENTS, SKILL_CATEGORIES } from '../data/portfolioData';
import { playComicSound } from '../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [customPdfUrl, setCustomPdfUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPdfUrl(url);
      playComicSound('zap');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#111118] border border-white/20 rounded-2xl max-w-4xl w-full my-8 p-6 md:p-8 space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto text-neutral-200">
        {/* Header Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#e2252b]" />
            <div>
              <h3 className="text-xl font-bold font-display text-white">
                Shubham Sharma — Curriculum Vitae
              </h3>
              <p className="text-xs font-mono text-neutral-400">
                Official Resume & Academic Credentials
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-mono bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print Resume or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 text-sm cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* Upload Custom PDF Instruction & Status */}
        <div className="p-4 bg-black/40 border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="space-y-0.5">
            <span className="text-[#00d4ff] font-bold block">
              PDF LOCATION REFERENCE:
            </span>
            <span className="text-neutral-400">
              Save your official PDF at: <code className="text-white">/public/shubham_sharma_resume.pdf</code>
            </span>
          </div>

          <label className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/15 cursor-pointer flex items-center gap-1.5 shrink-0 transition-colors">
            <Upload className="w-3.5 h-3.5 text-[#e2252b]" />
            <span>Select Local PDF</span>
            <input
              type="file"
              accept=".pdf"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>
        </div>

        {customPdfUrl && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-400">
            <span>✓ Custom PDF Loaded in session!</span>
            <a
              href={customPdfUrl}
              download="Shubham_Sharma_Resume.pdf"
              className="px-3 py-1 bg-emerald-500 text-black font-bold rounded flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              Download PDF
            </a>
          </div>
        )}

        {/* Structured Resume Content (Printable & Inspectable) */}
        <div className="p-6 md:p-8 bg-[#09090d] border border-white/10 rounded-2xl space-y-8 font-sans print:bg-white print:text-black">
          {/* Header */}
          <div className="text-center space-y-2 border-b border-white/10 pb-6 print:border-black/20">
            <h1 className="text-3xl font-black font-display tracking-tight text-white print:text-black">
              SHUBHAM SHARMA
            </h1>
            <p className="text-xs font-mono text-neutral-400 print:text-neutral-700">
              Lucknow, Uttar Pradesh, India · {PERSONAL_INFO.email}
            </p>
            <div className="flex justify-center gap-3 text-xs font-mono text-[#00d4ff] print:text-blue-700">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <span>·</span>
              <a href={PERSONAL_INFO.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#e2252b] print:text-red-700 font-bold border-b border-white/10 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-xs leading-relaxed text-neutral-300 print:text-neutral-800">
              {PERSONAL_INFO.aboutIntroduction}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#e2252b] print:text-red-700 font-bold border-b border-white/10 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-white print:text-black block">
                    B.Tech in Computer Science & Engineering
                  </span>
                  <span className="text-neutral-400 print:text-neutral-600">
                    Ambalika Institute of Management and Technology, Lucknow
                  </span>
                </div>
                <span className="font-mono text-neutral-400 print:text-neutral-600">
                  2023 – 2027
                </span>
              </div>

              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-white print:text-black block">
                    Intermediate (Class XII) — Science
                  </span>
                  <span className="text-neutral-400 print:text-neutral-600">
                    Physics, Chemistry, Mathematics Foundation
                  </span>
                </div>
                <span className="font-mono text-neutral-400 print:text-neutral-600">
                  Completed 2023
                </span>
              </div>

              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-bold text-white print:text-black block">
                    High School (Class X)
                  </span>
                  <span className="text-neutral-400 print:text-neutral-600">
                    Secondary School Education
                  </span>
                </div>
                <span className="font-mono text-neutral-400 print:text-neutral-600">
                  Completed 2021
                </span>
              </div>
            </div>
          </div>

          {/* Certifications & Industry Training */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#e2252b] print:text-red-700 font-bold border-b border-white/10 pb-1">
              CERTIFICATIONS & TRAINING
            </h2>
            <div className="space-y-2 text-xs">
              {CERTIFICATIONS.map((c) => (
                <div key={c.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-white print:text-black block">
                      {c.title} — {c.issuer}
                    </span>
                    <span className="text-neutral-400 print:text-neutral-600">
                      {c.topics.join(', ')}
                    </span>
                  </div>
                  <div className="text-right font-mono text-neutral-400 print:text-neutral-600">
                    <span>{c.issueDate}</span>
                    {c.score && <span className="block text-emerald-400 font-bold">Score: {c.score}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#e2252b] print:text-red-700 font-bold border-b border-white/10 pb-1">
              FEATURED PROJECTS
            </h2>
            <div className="space-y-3 text-xs">
              {REAL_PROJECTS.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex justify-between font-bold text-white print:text-black">
                    <span>{p.title}</span>
                    <span className="font-mono font-normal text-neutral-400">{p.timeline}</span>
                  </div>
                  <p className="text-neutral-400 print:text-neutral-700">
                    {p.description}
                  </p>
                  <p className="font-mono text-[11px] text-neutral-400">
                    Technologies: {p.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#e2252b] print:text-red-700 font-bold border-b border-white/10 pb-1">
              TECHNICAL SKILLS & TOOLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-bold text-white print:text-black">Programming: </span>
                <span className="text-neutral-400">Python (Basic), Java</span>
              </div>
              <div>
                <span className="font-bold text-white print:text-black">Web: </span>
                <span className="text-neutral-400">HTML, CSS</span>
              </div>
              <div>
                <span className="font-bold text-white print:text-black">Fundamentals: </span>
                <span className="text-neutral-400">Variables, Data Types, Loops, Conditionals, Lists, Tuples</span>
              </div>
              <div>
                <span className="font-bold text-white print:text-black">Tools: </span>
                <span className="text-neutral-400">VS Code, Canva, Adobe Photoshop, Claude & AI tools</span>
              </div>
            </div>
          </div>

          {/* Honors & Activities */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#e2252b] print:text-red-700 font-bold border-b border-white/10 pb-1">
              HONORS & LEADERSHIP
            </h2>
            <ul className="space-y-1 text-xs text-neutral-300 print:text-neutral-700">
              <li>• 3x Gold Medals in Inter-College Singing Competitions</li>
              <li>• 1 Gold Medal & 1 Silver Medal in Inter-College Badminton Championships</li>
              <li>• College Singing Coordinator at AIMT Cultural Committee</li>
              <li>• Discipline Volunteer for AIMT Campus Operations & Events</li>
            </ul>
          </div>
        </div>

        {/* Footer Close */}
        <div className="flex justify-end pt-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#e2252b] hover:bg-[#c51c22] rounded-lg transition-colors cursor-pointer"
          >
            Close Resume
          </button>
        </div>
      </div>
    </div>
  );
};
