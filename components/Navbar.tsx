"use client";
import { useState } from 'react';
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
        className="hidden md:block"
        padding="0"
        style={{ position: 'fixed', top: '3.5rem', left: '50%', zIndex: 50 }}
      >
        <nav className="flex items-center gap-12 px-8 py-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
        className="md:hidden"
        padding="0"
        style={{ position: 'fixed', top: 'calc(100dvh - 4rem)', left: '50%', zIndex: 50 }}
      >
        <nav className="flex w-[calc(100vw-2rem)] items-center justify-between p-2 shadow-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex flex-1 flex-col items-center justify-center py-3 text-xs"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-tab"
                    className="absolute inset-0 rounded-xl bg-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center space-y-1">
                  <Icon size={20} className={isActive ? "text-white" : "text-white/60"} />
                  <span className={isActive ? "text-white font-semibold" : "text-white/60"}>
                    {tab.label}
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
