import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../types';
import { Editable } from './Editable';
import { AIChat } from './AIChat';
import { 
  Video, 
  Globe, 
  Megaphone, 
  TrendingUp, 
  Cpu, 
  Palette, 
  ArrowUpRight,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react';

interface BentoGridProps {
  data: PortfolioData;
  isEditing: boolean;
  onUpdate: (newData: PortfolioData) => void;
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 } 
  }
};

const CardBase = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className={`glass-panel rounded-3xl p-6 relative overflow-hidden group ${className}`}
  >
    {children}
  </motion.div>
);

export const BentoGrid: React.FC<BentoGridProps> = ({ data, isEditing, onUpdate }) => {
  
  const updateSkill = (index: number, field: string, value: any) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    onUpdate({ ...data, skills: newSkills });
  };

  const getIcon = (category: string) => {
    switch(category) {
      case 'creation': return <Video className="w-6 h-6 text-pink-500" />;
      case 'social': return <Globe className="w-6 h-6 text-blue-500" />;
      case 'influencer': return <Megaphone className="w-6 h-6 text-yellow-500" />;
      case 'marketing': return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'ai': return <Cpu className="w-6 h-6 text-purple-500" />;
      case 'production': return <Palette className="w-6 h-6 text-orange-500" />;
      default: return <Video />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
      
      {/* 1. Content Creation - Large Feature */}
      <CardBase className="md:col-span-2 md:row-span-2 min-h-[400px] flex flex-col justify-between bg-gradient-to-br from-zinc-900 to-zinc-950">
        <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
           <Video size={120} />
        </div>
        <div className="z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
              {getIcon('creation')}
            </div>
            <Editable 
              tag="h3" 
              className="text-2xl font-bold text-white" 
              value={data.skills[0].title} 
              isEditing={isEditing} 
              onChange={(v) => updateSkill(0, 'title', v)} 
            />
          </div>
          <Editable 
            tag="p" 
            className="text-zinc-400 leading-relaxed mb-6" 
            value={data.skills[0].description} 
            isEditing={isEditing} 
            multiline
            onChange={(v) => updateSkill(0, 'description', v)} 
          />
        </div>
        
        {/* Visual representation of content creation */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
           <div className="bg-zinc-800 h-32 rounded-xl overflow-hidden relative group/img">
              <img 
                src={data.skills[0].images?.[0] || "https://picsum.photos/400/300"} 
                className="object-cover w-full h-full group-hover/img:scale-110 transition-transform duration-500 group-hover/img:grayscale-0" 
                alt="Work 1" 
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                 <span className="text-xs font-mono border border-white/50 px-2 py-1 rounded-full">Short Form</span>
              </div>
           </div>
           <div className="bg-zinc-800 h-32 rounded-xl overflow-hidden relative group/img">
              <img 
                src={data.skills[0].images?.[1] || "https://picsum.photos/400/301"} 
                className="object-cover w-full h-full group-hover/img:scale-110 transition-transform duration-500 group-hover/img:grayscale-0" 
                alt="Work 2" 
              />
               <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                 <span className="text-xs font-mono border border-white/50 px-2 py-1 rounded-full">Documentary</span>
              </div>
           </div>
        </div>
      </CardBase>

      {/* 2. Global Social Media - Vertical */}
      <CardBase className="md:row-span-2 bg-zinc-900">
        <div className="flex items-center gap-2 mb-4">
           <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              {getIcon('social')}
            </div>
           <Editable 
              tag="h3" 
              className="text-xl font-bold" 
              value={data.skills[1].title} 
              isEditing={isEditing} 
              onChange={(v) => updateSkill(1, 'title', v)} 
            />
        </div>
        <div className="space-y-6">
           <Editable 
              tag="p" 
              className="text-zinc-400 text-sm" 
              value={data.skills[1].description} 
              isEditing={isEditing} 
              multiline
              onChange={(v) => updateSkill(1, 'description', v)} 
            />
            
            <div className="space-y-3 mt-4">
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 flex items-center justify-center">
                         <Instagram size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-medium">Instagram</span>
                   </div>
                   <ArrowUpRight size={14} className="text-zinc-500" />
                </div>
                 <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                         <span className="text-white font-bold text-xs">Tk</span>
                      </div>
                      <span className="text-sm font-medium">TikTok</span>
                   </div>
                   <ArrowUpRight size={14} className="text-zinc-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                         <Youtube size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-medium">YouTube</span>
                   </div>
                   <ArrowUpRight size={14} className="text-zinc-500" />
                </div>
            </div>
        </div>
      </CardBase>

      {/* 3. AI Application - Interactive Gemini Module */}
      <CardBase className="md:col-span-1 md:row-span-2 p-0 overflow-hidden ring-1 ring-purple-500/20 hover:ring-purple-500/50 transition-all">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_70%)]" />
        </div>
        <div className="relative z-10 h-full flex flex-col">
           <div className="p-6 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                  {getIcon('ai')}
                </div>
                 <Editable 
                  tag="h3" 
                  className="text-lg font-bold" 
                  value={data.skills[4].title} 
                  isEditing={isEditing} 
                  onChange={(v) => updateSkill(4, 'title', v)} 
                />
              </div>
              <p className="text-xs text-zinc-500 mb-4">Powered by Google Gemini</p>
           </div>
           <div className="flex-1 px-2 pb-2">
             <AIChat 
                ownerName={data.hero.name} 
                skills={JSON.stringify(data.skills.map(s => s.title + ": " + s.description))} 
             />
           </div>
        </div>
      </CardBase>

      {/* 4. Influencer Marketing */}
      <CardBase className="md:col-span-1 bg-zinc-900">
         <div className="flex items-center gap-2 mb-4">
             <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
              {getIcon('influencer')}
            </div>
            <Editable 
              tag="h3" 
              className="text-lg font-bold" 
              value={data.skills[2].title} 
              isEditing={isEditing} 
              onChange={(v) => updateSkill(2, 'title', v)} 
            />
         </div>
         <div className="flex justify-between items-end mt-8">
            <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-xs text-zinc-500">Campaigns</div>
            </div>
            <div className="h-8 w-[1px] bg-zinc-800"></div>
            <div className="text-center">
                <div className="text-2xl font-bold text-white">20M+</div>
                <div className="text-xs text-zinc-500">Reach</div>
            </div>
         </div>
         <Editable 
            tag="p" 
            className="text-zinc-400 text-xs mt-4" 
            value={data.skills[2].description} 
            isEditing={isEditing} 
            multiline
            onChange={(v) => updateSkill(2, 'description', v)} 
          />
      </CardBase>

      {/* 5. Creative Production */}
      <CardBase className="md:col-span-1 bg-zinc-900 overflow-hidden">
        <div className="flex items-center gap-2 mb-4 z-10 relative">
            <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
              {getIcon('production')}
            </div>
             <Editable 
              tag="h3" 
              className="text-lg font-bold" 
              value={data.skills[5].title} 
              isEditing={isEditing} 
              onChange={(v) => updateSkill(5, 'title', v)} 
            />
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
        <Editable 
            tag="p" 
            className="text-zinc-400 text-sm relative z-10" 
            value={data.skills[5].description} 
            isEditing={isEditing} 
            multiline
            onChange={(v) => updateSkill(5, 'description', v)} 
        />
        <div className="mt-4 flex -space-x-3 overflow-hidden relative z-10 pl-2">
            {(data.skills[5].images || [1,2,3]).map((imgSrc, i) => (
                <img 
                  key={i} 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-zinc-900 object-cover" 
                  src={typeof imgSrc === 'string' ? imgSrc : `https://picsum.photos/100/100?random=${i}`} 
                  alt=""
                />
            ))}
            <div className="h-8 w-8 rounded-full ring-2 ring-zinc-900 bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-medium">+12</div>
        </div>
      </CardBase>

      {/* 6. Content Marketing - Wide */}
      <CardBase className="md:col-span-2 bg-zinc-900">
         <div className="flex items-center gap-2 mb-4">
             <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
              {getIcon('marketing')}
            </div>
             <Editable 
              tag="h3" 
              className="text-lg font-bold" 
              value={data.skills[3].title} 
              isEditing={isEditing} 
              onChange={(v) => updateSkill(3, 'title', v)} 
            />
         </div>
         <Editable 
            tag="p" 
            className="text-zinc-400 text-sm mb-6" 
            value={data.skills[3].description} 
            isEditing={isEditing} 
            multiline
            onChange={(v) => updateSkill(3, 'description', v)} 
          />
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden flex">
             <div className="h-full bg-green-500 w-[40%]"></div>
             <div className="h-full bg-green-700 w-[30%]"></div>
             <div className="h-full bg-green-900 w-[30%]"></div>
          </div>
          <div className="flex justify-between text-xs text-zinc-500 mt-2 font-mono uppercase tracking-wide">
             <span>Strategy</span>
             <span>Execution</span>
             <span>Analysis</span>
          </div>
      </CardBase>
    </div>
  );
};