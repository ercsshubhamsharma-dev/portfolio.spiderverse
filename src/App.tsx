import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DesignPlayground } from './components/DesignPlayground';
import { VisualExperiments } from './components/VisualExperiments';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';
import { ThreeSpiderCanvas } from './components/ThreeSpiderCanvas';
import { MULTIVERSE_THEMES } from './data/portfolioData';
import { MultiverseTheme } from './types';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<MultiverseTheme>(MULTIVERSE_THEMES[0]);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll Progress Tracking for 3D Camera Kinematics
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = window.scrollY / totalScroll;
        setScrollProgress(Math.min(Math.max(current, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update CSS root variables when multiverse theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-red', currentTheme.primaryRed);
    root.style.setProperty('--accent-blue', currentTheme.primaryBlue);
    root.style.setProperty('--canvas-bg', currentTheme.bgDark);
  }, [currentTheme]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#ededef] selection:bg-[#e2252b] selection:text-white transition-colors duration-500 overflow-x-hidden">
      {/* 3D WebGL Spider-Verse Interactive Canvas (Scroll-Driven) */}
      <ThreeSpiderCanvas
        primaryColor={currentTheme.primaryRed}
        secondaryColor={currentTheme.primaryBlue}
        scrollProgress={scrollProgress}
      />

      {/* Spider-Verse Custom Reticle Pointer */}
      <CustomCursor
        primaryColor={currentTheme.primaryRed}
        secondaryColor={currentTheme.primaryBlue}
      />

      {/* Foreground Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen pointer-events-auto">
        {/* Navigation Bar */}
        <Navbar
          onOpenResume={() => setIsResumeOpen(true)}
          activeThemeName={currentTheme.name}
        />

        {/* Main Content Sections */}
        <main className="flex-1 space-y-4">
          {/* Section 1: Hero */}
          <Hero
            onExploreWork={() => scrollToSection('work')}
            onEnterPlayground={() => scrollToSection('playground')}
            onContactMe={() => scrollToSection('contact')}
            primaryColor={currentTheme.primaryRed}
            secondaryColor={currentTheme.primaryBlue}
          />

          {/* Section 2: Design Playground */}
          <DesignPlayground
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
          />

          {/* Section 3: Visual Experiments (My Creative Lab) */}
          <VisualExperiments
            primaryColor={currentTheme.primaryRed}
            secondaryColor={currentTheme.primaryBlue}
          />

          {/* Section 4: Projects As Case Studies */}
          <ProjectsSection
            primaryColor={currentTheme.primaryRed}
            secondaryColor={currentTheme.primaryBlue}
          />

          {/* Section 5: About Me */}
          <AboutSection
            primaryColor={currentTheme.primaryRed}
            secondaryColor={currentTheme.primaryBlue}
          />

          {/* Section 6: Skills */}
          <SkillsSection
            primaryColor={currentTheme.primaryRed}
            secondaryColor={currentTheme.primaryBlue}
          />

          {/* Section 7: Creative Achievements */}
          <AchievementsSection
            primaryColor={currentTheme.primaryRed}
            secondaryColor={currentTheme.primaryBlue}
          />

          {/* Section 8: Education & Certifications */}
          <EducationSection
            primaryColor={currentTheme.primaryRed}
            secondaryColor={currentTheme.primaryBlue}
          />

          {/* Section 9: Contact & Transmission */}
          <ContactSection
            onOpenResume={() => setIsResumeOpen(true)}
            primaryColor={currentTheme.primaryRed}
            secondaryColor={currentTheme.primaryBlue}
          />
        </main>

        {/* Section 10: Footer */}
        <Footer />

        {/* Full Resume Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </div>
  );
}
