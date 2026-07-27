"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Coffee, Info, Phone } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'menu', label: 'Menu', icon: Coffee },
  { id: 'about', label: 'About', icon: Info },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <>
      {/* Desktop Top Nav */}
      <nav className="hidden md:flex fixed top-8 left-1/2 -translate-x-1/2 z-50 glass-nav rounded-2xl px-8 py-4 items-center space-x-12">
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

      {/* Mobile Bottom Floating Nav */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50 glass-nav rounded-2xl p-2 flex justify-between items-center shadow-2xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex-1 py-3 flex flex-col items-center justify-center text-xs"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active-tab"
                  className="absolute inset-0 bg-white/20 rounded-xl"
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
    </>
  )
}
