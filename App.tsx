import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { Settings, Check, Github, Linkedin, Mail } from 'lucide-react';
import { PortfolioData } from './types';
import { Editable } from './components/Editable';
import { BentoGrid } from './components/BentoGrid';

// Default Initial Data
// 你可以在这里修改所有的文字内容和图片链接
const initialData: PortfolioData = {
  hero: {
    name: "DYRUS",
    role: "Content Operations & Creation Lead",
    tagline: "Bridging Creativity and Strategy in the Digital Age",
    description: "I specialize in building scalable content engines, managing global social media presence, and leveraging AI to optimize creative workflows. Based in the Digital Realm.",
    profileImage: "https://picsum.photos/600/900?grayscale" // Hero 左侧主要人物图片
  },
  stats: [
    { label: "Years Exp", value: "7+" },
    { label: "Projects", value: "120+" },
    { label: "Clients", value: "45+" },
  ],
  skills: [
    {
      id: "1",
      title: "Content Creation",
      category: "creation",
      description: "Producing high-quality visuals, video essays, and short-form content that resonates with diverse audiences.",
      details: [],
      images: [
        "https://picsum.photos/400/300?grayscale", // 图片 1: Short Form
        "https://picsum.photos/400/301?grayscale"  // 图片 2: Documentary
      ]
    },
    {
      id: "2",
      title: "Overseas Operations",
      category: "social",
      description: "Managing cross-border social media accounts (TikTok, IG, YouTube) with localized strategies.",
      details: []
    },
    {
      id: "3",
      title: "Influencer Marketing",
      category: "influencer",
      description: "Connecting brands with key opinion leaders to drive authentic engagement and ROI.",
      details: []
    },
    {
      id: "4",
      title: "Content Marketing",
      category: "marketing",
      description: "Data-driven storytelling that converts viewers into loyal community members.",
      details: []
    },
    {
      id: "5",
      title: "AI Application",
      category: "ai",
      description: "Implementing LLMs and Generative AI to accelerate research, scripting, and visual ideation.",
      details: []
    },
    {
      id: "6",
      title: "Creative Production",
      category: "production",
      description: "End-to-end production management from concept creative brief to final delivery.",
      details: [],
      images: [
        "https://picsum.photos/100/100?random=1",
        "https://picsum.photos/100/100?random=2",
        "https://picsum.photos/100/100?random=3"
      ]
    }
  ],
  contact: {
    email: "hello@dyrus.work",
    linkedin: "dyrus-content"
  }
};

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const updateHero = (field: string, value: string) => {
    setData(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
      {/* Navigation / Edit Toggle */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <span className="font-bold text-xl tracking-tighter">D/C</span>
        </motion.div>
        
        <div className="pointer-events-auto flex items-center gap-4">
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`p-3 rounded-full transition-all duration-300 backdrop-blur-md border ${isEditing ? 'bg-green-500 text-black border-green-400' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            {isEditing ? <Check size={20} /> : <Settings size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto">
         {/* Decorative Background Elements */}
         <div className="absolute top-20 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute top-40 left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden mb-2">
                 <Editable 
                    tag="h1" 
                    className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500" 
                    value={data.hero.name} 
                    isEditing={isEditing} 
                    onChange={(v) => updateHero('name', v)} 
                  />
              </div>
              <Editable 
                tag="h2" 
                className="text-2xl md:text-3xl font-medium text-zinc-400 mb-6 block" 
                value={data.hero.role} 
                isEditing={isEditing} 
                onChange={(v) => updateHero('role', v)} 
              />
              <Editable 
                tag="p" 
                className="text-lg text-zinc-500 max-w-lg leading-relaxed mb-8 block" 
                value={data.hero.description} 
                isEditing={isEditing} 
                multiline
                onChange={(v) => updateHero('description', v)} 
              />
              
              <div className="flex gap-8 border-t border-zinc-800 pt-8">
                 {data.stats.map((stat, idx) => (
                    <div key={idx}>
                       <div className="text-3xl font-bold text-white">{stat.value}</div>
                       <div className="text-sm text-zinc-600 font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                 ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden lg:block h-[600px]"
            >
               {/* "Character" Simulation - Using CSS Layering/Animation to simulate 3D/Parallax */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                    {/* 使用配置的 profileImage */}
                    <img 
                      src={data.hero.profileImage} 
                      alt="Dyrus Profile" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Floating Interface Elements Simulation */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      className="absolute bottom-12 left-6 right-6 p-4 glass-panel rounded-2xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                          <Check size={20} />
                        </div>
                        <div>
                           <div className="text-xs text-zinc-400">Status</div>
                           <div className="text-sm font-semibold text-white">Open to Work</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
               </div>
            </motion.div>
         </div>
      </header>

      {/* Grid Section */}
      <main className="pb-32">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
        >
          <BentoGrid 
            data={data} 
            isEditing={isEditing} 
            onUpdate={setData} 
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black py-12 px-6">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
               <h3 className="text-2xl font-bold tracking-tighter text-white mb-2">{data.hero.name}</h3>
               <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex gap-6">
                <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Github /></a>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin /></a>
                <a href={`mailto:${data.contact.email}`} className="text-zinc-500 hover:text-white transition-colors"><Mail /></a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;