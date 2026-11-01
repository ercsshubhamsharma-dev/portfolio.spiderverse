import React, { useState } from 'react';
import { GraduationCap, Award, CheckCircle, ExternalLink, ShieldCheck, FileCheck } from 'lucide-react';
import { EDUCATION_ITEMS, CERTIFICATIONS } from '../data/portfolioData';
import { CertificationItem } from '../types';
import { playComicSound } from '../utils/audio';

interface EducationSectionProps {
  primaryColor: string;
  secondaryColor: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  primaryColor,
  secondaryColor,
}) => {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);

  return (
    <section id="education" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#00d4ff]">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>ACADEMIC FOUNDATION & VERIFIED CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
          EDUCATION & CERTIFICATIONS
        </h2>
        <p className="text-neutral-300 max-w-2xl text-base leading-relaxed">
          Rigorous engineering coursework, industrial technology immersion, and accredited programming certifications backed by IIT Bombay and Barrownz Learning Academy.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Formal Education Milestones (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e2252b]" />
            Academic Degrees & Schooling
          </h3>

          <div className="space-y-6">
            {EDUCATION_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#0f0f16] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-[#00d4ff] uppercase block">
                      {item.period} · {item.location}
                    </span>
                    <h4 className="text-lg font-bold font-display text-white mt-0.5">
                      {item.degree}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md self-start sm:self-auto border border-white/5">
                    {item.status}
                  </span>
                </div>

                <div className="pt-3 space-y-2">
                  <p className="text-sm font-semibold text-neutral-200">
                    {item.institution}
                  </p>
                  <ul className="space-y-1.5 pt-1">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-xs text-neutral-300 flex items-start gap-2">
                        <span className="text-[#e2252b] font-bold">▸</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Verified Certifications & Industry Training (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff]" />
            Verified Technical Credentials
          </h3>

          <div className="space-y-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#0f0f16] border border-white/10 hover:border-white/25 rounded-2xl p-6 shadow-xl space-y-4 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      VERIFIED ACCREDITATION
                    </span>
                    <h4 className="text-lg font-bold font-display text-white group-hover:text-[#00d4ff] transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-neutral-300">
                      {cert.issuer}
                    </p>
                  </div>

                  {cert.score && (
                    <div className="text-right p-2 bg-black/60 rounded-xl border border-white/10 shrink-0">
                      <span className="text-xs font-mono text-neutral-400 block">Score</span>
                      <span className="text-lg font-black font-display text-emerald-400">
                        {cert.score}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex justify-between">
                    <span>Issue Date:</span>
                    <span className="text-white">{cert.issueDate}</span>
                  </div>
                  {cert.credits && (
                    <div className="flex justify-between">
                      <span>Academic Credits:</span>
                      <span className="text-[#00d4ff] font-bold">{cert.credits} Credits</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-mono text-neutral-400 block mb-1.5 uppercase">
                    Curriculum & Competencies Covered:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.topics.map((top) => (
                      <span
                        key={top}
                        className="text-[10px] font-mono text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        {top}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedCert(cert);
                      playComicSound('click');
                    }}
                    className="text-xs font-bold text-white hover:text-[#00d4ff] flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4 text-[#e2252b]" />
                    <span>View Certificate Record</span>
                  </button>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Official Record
                  </span>
                </div>
              </div>
            ))}

            {/* Industrial Visit Note */}
            <div className="p-5 bg-gradient-to-br from-[#12121e] to-[#0a0a10] border border-white/10 rounded-2xl space-y-2 text-xs text-neutral-300">
              <span className="font-bold text-white block font-display">
                Industrial Exposure: Barrownz Learning Academy
              </span>
              <p className="leading-relaxed">
                Completed an on-site industrial visit on 06 March 2025 exploring modern software deployment cycles, enterprise architecture pipelines, and professional collaborative workflows.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Inspector Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#111118] border border-white/20 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#00d4ff]" />
                <h3 className="text-base font-bold font-display text-white">
                  Certificate Record Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-black/70 rounded-xl border border-white/10 space-y-2 font-mono">
                <div className="text-sm font-bold text-white">{selectedCert.title}</div>
                <div className="text-neutral-400">Awarded by: {selectedCert.issuer}</div>
                <div className="text-neutral-400">Issued: {selectedCert.issueDate}</div>
                {selectedCert.score && (
                  <div className="text-emerald-400 font-bold">
                    Official Examination Score: {selectedCert.score} (Credits: {selectedCert.credits})
                  </div>
                )}
              </div>

              <div>
                <span className="font-mono text-neutral-400 block mb-1">
                  Verified Topics & Competencies:
                </span>
                <ul className="space-y-1">
                  {selectedCert.topics.map((t, i) => (
                    <li key={i} className="text-neutral-300 flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
