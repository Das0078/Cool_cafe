"use client";
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Home, Coffee, Info, Phone } from 'lucide-react';
import Image from 'next/image';
import LiquidGlass from 'liquid-glass-react';
import cafeCoolLogo from '@/assets/logo/only_image.png';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'menu', label: 'Menu', icon: Coffee },
  { id: 'about', label: 'About', icon: Info },
  { id: 'contact', label: 'Contact', icon: Phone },
];

const glassOptions = {
  displacementScale: 48,
  blurAmount: 0.08,
  saturation: 150,
  aberrationIntensity: 1.5,
  elasticity: 0.2,
  cornerRadius: 24,
};

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      setHidden(y > 120 && delta > 0);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
    <div className="fixed bg-[#110a06] left-4 top-4 z-50 h-auto w-15 md:left-8 md:top-6 md:w-18 py-2.5 rounded-[50%]">

      <Image
        src={cafeCoolLogo}
        alt="Cafe Cool"
        priority
        
      />
    </div>

      {/* Desktop Top Nav */}
      <LiquidGlass
        {...glassOptions}
        className={`hidden md:block transition-transform duration-500 ease-out ${hidden ? '-translate-y-40' : 'translate-y-0'}`}
        padding="0"
        style={{ position: 'fixed', top: '3.5rem', left: '50%', zIndex: 50 }}
      >
        <nav className="flex items-center gap-12 px-8 py-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`relative px-2 py-1 text-sm font-semibold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="desktop-active-border"
                    className="absolute left-0 right-0 bottom-[-8px] h-[2px] bg-white"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </LiquidGlass>

      {/* Mobile Bottom Floating Nav */}
      <LiquidGlass
        {...glassOptions}
        className={`md:hidden transition-transform duration-500 ease-out ${hidden ? 'translate-y-40' : 'translate-y-0'}`}
        padding="0"
        style={{ position: 'fixed', top: 'calc(100dvh - 4.5rem)', left: '50%', zIndex: 50 }}
      >
        <nav className="flex items-center gap-2 rounded-full bg-[#2b1a10] p-2 shadow-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className="relative flex flex-1 flex-col items-center justify-center rounded-full px-4 py-2.5"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-tab"
                    className="absolute inset-0 rounded-full bg-[#e8b4a0]/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center space-y-0.5">
                  <Icon size={18} strokeWidth={1.8} className={isActive ? "text-[#eec7b8]" : "text-[#b79d8b]/70"} />
                  <span className={`text-[9px] tracking-widest ${isActive ? "text-[#eec7b8] font-semibold" : "text-[#b79d8b]/70"}`}>
                    {tab.label.toUpperCase()}
                  </span>
                </span>
              </button>
            )
          })}
        </nav>
      </LiquidGlass>
    </>
  )
}
