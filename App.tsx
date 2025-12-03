import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { Settings, Check, Github, Linkedin, Mail } from 'lucide-react';
import { PortfolioData } from './types';
import { Editable } from './components/Editable';
import { BentoGrid } from './components/BentoGrid';

// Default Initial Data
// 这里填入了张腾的中文简历数据
const initialData: PortfolioData = {
  hero: {
    name: "张腾 Dyrus",
    role: "内容运营专家 | AIGC工作流改造者",
    tagline: "以数据驱动创意，用AI重塑内容生产力",
    description: "7年内容操盘经验。擅长海外社媒0-1搭建、AIGC深度应用及网红营销。曾助力20位网红累计涨粉500万，通过AI工作流提升3倍筛选效率。具备极强的单兵作战与跨文化团队管理能力。",
    profileImage: "https://picsum.photos/600/900?grayscale" // 建议替换为你简历上的真实照片 URL
  },
  stats: [
    { label: "工作经验", value: "7年" },
    { label: "全网涨粉", value: "500W+" },
    { label: "ROI增长", value: "300%" },
  ],
  skills: [
    {
      id: "1",
      title: "视频全流程制作",
      category: "creation",
      description: "精通PR/AE，独立完成选题策划、脚本、拍摄及后期。相比专业后期，更擅长用剪辑思维服务营销目标。",
      details: ["Premiere", "After Effects", "选题策划", "分镜脚本"],
      images: [
        "https://picsum.photos/400/300?grayscale", 
        "https://picsum.photos/400/301?grayscale"
      ]
    },
    {
      id: "2",
      title: "海外社媒操盘",
      category: "social",
      description: "独立负责FB, IG, TikTok, YouTube等全平台矩阵搭建。擅长通过数据复盘调整策略，单条视频观看增长100%+。",
      details: ["TikTok", "Instagram", "Facebook", "YouTube"],
      images: []
    },
    {
      id: "3",
      title: "网红开发与管理",
      category: "influencer",
      description: "独创筛选模型，2周签约40位高潜网红。协助20位签约网红在3个月内累计涨粉500万。",
      details: ["KOL签约", "内容孵化", "数据监控"],
      images: []
    },
    {
      id: "4",
      title: "内容营销策略",
      category: "marketing",
      description: "曾通过小额投流跑通ROI模型（10美元撬动300%播放增长），具备低成本撬动高回报的经营思维。",
      details: ["数据分析", "投流测试", "转化率优化"],
      images: []
    },
    {
      id: "5",
      title: "AIGC 深度应用",
      category: "ai",
      description: "不仅是使用者，更是工作流改造者。利用ChatGPT润色多语种文案，Midjourney生成视觉素材，飞书多维表格搭建筛选模型。",
      details: ["ChatGPT", "Midjourney", "Workflow Automation"],
      images: []
    },
    {
      id: "6",
      title: "团队管理与沟通",
      category: "production",
      description: "拥有海外生活背景，英语可作为工作语言。曾带8人团队提升执行力50%，主导OKR管理模式。",
      details: ["跨文化沟通", "团队赋能", "OKR管理"],
      images: [
        "https://picsum.photos/100/100?random=1",
        "https://picsum.photos/100/100?random=2",
        "https://picsum.photos/100/100?random=3"
      ]
    }
  ],
  contact: {
    email: "dyrusz824@163.com",
    linkedin: "dyrus-zhang"
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
                    className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500" 
                    value={data.hero.name} 
                    isEditing={isEditing} 
                    onChange={(v) => updateHero('name', v)} 
                  />
              </div>
              <Editable 
                tag="h2" 
                className="text-xl md:text-2xl font-medium text-zinc-400 mb-6 block" 
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
               {/* "Character" Simulation */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                    <img 
                      src={data.hero.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Floating Interface Elements */}
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
                           <div className="text-xs text-zinc-400">状态</div>
                           <div className="text-sm font-semibold text-white">随时入职</div>
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