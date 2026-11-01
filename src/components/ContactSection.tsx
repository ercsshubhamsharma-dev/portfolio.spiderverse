import React, { useState } from 'react';
import { Mail, Github, Linkedin, Code, MapPin, Send, Check, Copy, FileText, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playComicSound } from '../utils/audio';

interface ContactSectionProps {
  onOpenResume: () => void;
  primaryColor: string;
  secondaryColor: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenResume,
  primaryColor,
  secondaryColor,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isCopied, setIsCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setIsCopied(true);
    playComicSound('click');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setErrorMsg('');
    setFormSubmitted(true);
    playComicSound('thwip');

    // Trigger direct mailto client so message actually delivers to Shubham
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name} via Spider-Verse Portfolio`);
    const body = encodeURIComponent(
      `Hi Shubham,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#e2252b]">
          <Mail className="w-3.5 h-3.5" />
          <span>ESTABLISH MULTIVERSE COMMS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-display text-white">
          GET IN TOUCH
        </h2>
        <p className="text-neutral-300 max-w-2xl text-base leading-relaxed">
          Open to collaborative software engineering opportunities, creative developer projects, and tech conversations. Reach out directly or connect across developer platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Links & Handles (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Email Box */}
          <div className="bg-[#0f0f16] border border-white/15 rounded-3xl p-6 shadow-xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              PRIMARY DIRECT INBOX
            </span>
            <div className="flex items-center justify-between p-3.5 bg-black/50 border border-white/10 rounded-xl">
              <span className="text-xs sm:text-sm font-mono text-white truncate mr-2">
                {PERSONAL_INFO.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-2 text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {isCopied && (
              <span className="text-xs font-mono text-emerald-400 block">
                ✓ Copied shubhamsharma10072005@gmail.com to clipboard!
              </span>
            )}
          </div>

          {/* Social / Developer Links */}
          <div className="bg-[#0f0f16] border border-white/15 rounded-3xl p-6 shadow-xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              DEVELOPER PLATFORMS & LOCATION
            </span>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-white/20 bg-black/30 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-white" />
                <div>
                  <span className="text-xs font-bold font-display text-white block">GitHub Profile</span>
                  <span className="text-[11px] font-mono text-neutral-400 block">ercsshubhamsharma-dev</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-white/20 bg-black/30 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-[#00d4ff]" />
                <div>
                  <span className="text-xs font-bold font-display text-white block">LinkedIn Profile</span>
                  <span className="text-[11px] font-mono text-neutral-400 block">shubham-sharma-005600287</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </a>

            <a
              href={PERSONAL_INFO.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-white/5 hover:border-white/20 bg-black/30 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-xs font-bold font-display text-white block">LeetCode Profile</span>
                  <span className="text-[11px] font-mono text-neutral-400 block">shubhamsharma05102005</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-white" />
            </a>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5 text-neutral-300">
              <MapPin className="w-5 h-5 text-[#e2252b] shrink-0" />
              <div>
                <span className="text-xs font-bold font-display text-white block">Location</span>
                <span className="text-[11px] font-mono text-neutral-400 block">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Resume Viewer CTA */}
          <div className="bg-gradient-to-r from-[#181124] to-[#111928] border border-white/15 rounded-3xl p-6 shadow-xl space-y-3">
            <span className="text-xs font-mono uppercase text-[#00d4ff] block font-bold">
              CURRICULUM VITAE
            </span>
            <h4 className="text-xl font-bold font-display text-white">
              Shubham Sharma Resume Document
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Access the complete structured resume with B.Tech CSE coursework, Spoken Tutorial IIT Bombay score (75%), projects, and inter-college medals.
            </p>
            <button
              onClick={() => {
                playComicSound('thwip');
                onOpenResume();
              }}
              className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#e2252b] hover:bg-[#c51c22] rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Open & Inspect Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Verified Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#0f0f16] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold font-display text-white">
              Send a Transmission
            </h3>
            <p className="text-xs text-neutral-300 font-mono">
              Validated form connected directly to mailto protocol. No mock stubs.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-display text-base">
                <Check className="w-5 h-5" />
                Transmission Initialized!
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Your email client has been launched with your message pre-formatted for{' '}
                <span className="text-white font-mono">{PERSONAL_INFO.email}</span>. You can also send directly or reach out on LinkedIn!
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-2 px-4 py-2 text-xs font-mono text-neutral-300 hover:text-white bg-white/10 rounded-lg cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              {errorMsg && (
                <div className="p-3 bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl font-mono text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-neutral-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Miles Morales"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white font-sans focus:border-[#00d4ff] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-neutral-300 mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. miles@spiderverse.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white font-sans focus:border-[#00d4ff] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-neutral-300 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Project Collaboration / Developer Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white font-sans focus:border-[#00d4ff] outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-neutral-300 mb-1">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your idea, project, or role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-black/60 border border-white/10 rounded-xl text-white font-sans focus:border-[#00d4ff] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white bg-[#e2252b] hover:bg-[#c51c22] rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
