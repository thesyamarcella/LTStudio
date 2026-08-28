import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { StatusBadge } from './StatusBadge';
import { EcosystemMapNode } from '../types';
import { Network, Layers, ArrowUpRight } from 'lucide-react';

export const EcosystemArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Personal' | 'Professional'>('Personal');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>('saturumah');
  const { t, products, personalEcosystemNodes, professionalEcosystemNodes, language } = useLanguage();

  const activeNodes = activeTab === 'Personal' ? personalEcosystemNodes : professionalEcosystemNodes;

  // Find detail data for currently focused node
  const activeProductData = products.find(
    (p) => p.id === (hoveredNodeId || (activeTab === 'Personal' ? 'saturumah' : 'dayone'))
  );

  const activeNodeData = activeNodes.find(
    (n) => n.id === (hoveredNodeId || (activeTab === 'Personal' ? 'saturumah' : 'dayone'))
  );

  const isConnected = (nodeId: string) => {
    if (!hoveredNodeId) return false;
    if (nodeId === hoveredNodeId) return true;

    const sourceNode = activeNodes.find((n) => n.id === hoveredNodeId);
    if (sourceNode && sourceNode.connectsTo.includes(nodeId)) return true;
    if (sourceNode && sourceNode.connectedFrom.includes(nodeId)) return true;

    return false;
  };

  return (
    <section id="ecosystem" className="py-24 border-b border-[#E5E5E2] bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-8 border-b border-[#E5E5E2]">
          <div>
            <div className="text-xs uppercase font-mono tracking-[0.25em] text-[#1A1A1A]/40 mb-3">
              {t.ecosystem.categoryBadge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#1A1A1A]">
              {t.ecosystem.title}
            </h2>
          </div>

          {/* Tab Selection */}
          <div className="flex items-center gap-2 p-1 bg-[#F4F3F0] border border-[#E5E5E2] self-start md:self-auto">
            <button
              onClick={() => {
                setActiveTab('Personal');
                setHoveredNodeId('saturumah');
              }}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'Personal'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] shadow-xs'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }`}
            >
              {t.ecosystem.tabPersonal}
            </button>
            <button
              onClick={() => {
                setActiveTab('Professional');
                setHoveredNodeId('dayone');
              }}
              className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'Professional'
                  ? 'bg-[#1A1A1A] text-[#F9F8F6] shadow-xs'
                  : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
              }`}
            >
              {t.ecosystem.tabProfessional}
            </button>
          </div>
        </div>

        {/* Desktop Interactive Ecosystem Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Map Visual Stage */}
          <div className="lg:col-span-8 bg-[#F4F3F0] border border-[#E5E5E2] p-4 sm:p-8 lg:p-12 relative min-h-[460px] flex flex-col justify-between overflow-x-hidden">
            {/* Background Map Label */}
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 mb-6 sm:mb-8 border-b border-[#E5E5E2] pb-4">
              <span className="flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-[#D95D7D]" />
                {activeTab === 'Personal' ? (language === 'id' ? 'Grafik Ranah Pribadi' : 'Personal Domain Graph') : (language === 'id' ? 'Grafik Ranah Profesional' : 'Professional Domain Graph')}
              </span>
              <span className="hidden sm:inline">[ {t.ecosystem.hoverInstruction} ]</span>
            </div>

            {/* Map Architecture Layout */}
            {activeTab === 'Personal' ? (
              <div className="relative py-4 sm:py-6 max-w-2xl mx-auto w-full space-y-6 sm:space-y-8">
                {/* Level 1: EverAfter */}
                <div className="flex justify-center">
                  <NodeBlock
                    node={personalEcosystemNodes[0]}
                    isHovered={hoveredNodeId === 'everafter'}
                    isConnected={isConnected('everafter')}
                    isDimmed={Boolean(hoveredNodeId && !isConnected('everafter'))}
                    onHover={() => setHoveredNodeId('everafter')}
                  />
                </div>

                {/* Vertical Visual Connector Line */}
                <div className="flex justify-center my-1 sm:my-2">
                  <div className="w-px h-6 sm:h-8 bg-[#D95D7D]/60 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#D95D7D] rounded-full"></div>
                  </div>
                </div>

                {/* Level 2: Central Hub SatuRumah */}
                <div className="flex justify-center">
                  <div className="p-1 bg-[#1A1A1A] border border-[#D95D7D] inline-block shadow-md max-w-full">
                    <NodeBlock
                      node={personalEcosystemNodes[1]}
                      isCentralHub
                      isHovered={hoveredNodeId === 'saturumah'}
                      isConnected={isConnected('saturumah')}
                      isDimmed={Boolean(hoveredNodeId && !isConnected('saturumah'))}
                      onHover={() => setHoveredNodeId('saturumah')}
                    />
                  </div>
                </div>

                {/* Branching Visual Connectors */}
                <div className="hidden sm:grid grid-cols-2 gap-8 my-2 max-w-lg mx-auto relative">
                  <div className="border-t border-l border-[#D95D7D]/60 h-6 -mt-3 ml-1/2"></div>
                  <div className="border-t border-r border-[#D95D7D]/60 h-6 -mt-3 mr-1/2"></div>
                </div>
                <div className="flex sm:hidden justify-center my-1">
                  <div className="w-px h-6 bg-[#D95D7D]/60 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#D95D7D] rounded-full"></div>
                  </div>
                </div>

                {/* Level 3: OUR & LittleBetter */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto w-full">
                  <NodeBlock
                    node={personalEcosystemNodes[2]}
                    isHovered={hoveredNodeId === 'our'}
                    isConnected={isConnected('our')}
                    isDimmed={Boolean(hoveredNodeId && !isConnected('our'))}
                    onHover={() => setHoveredNodeId('our')}
                  />
                  <NodeBlock
                    node={personalEcosystemNodes[3]}
                    isHovered={hoveredNodeId === 'littlebetter'}
                    isConnected={isConnected('littlebetter')}
                    isDimmed={Boolean(hoveredNodeId && !isConnected('littlebetter'))}
                    onHover={() => setHoveredNodeId('littlebetter')}
                  />
                </div>

                {/* Connector from LittleBetter to GetAway */}
                <div className="flex justify-center sm:justify-end sm:pr-12 my-1 sm:my-2">
                  <div className="w-px h-6 bg-[#1A1A1A]/30 relative"></div>
                </div>

                {/* Level 4: GetAway */}
                <div className="flex justify-center sm:justify-end sm:pr-4">
                  <NodeBlock
                    node={personalEcosystemNodes[4]}
                    isHovered={hoveredNodeId === 'getaway'}
                    isConnected={isConnected('getaway')}
                    isDimmed={Boolean(hoveredNodeId && !isConnected('getaway'))}
                    onHover={() => setHoveredNodeId('getaway')}
                  />
                </div>
              </div>
            ) : (
              /* Professional Life Map */
              <div className="relative py-12 max-w-md mx-auto w-full space-y-6">
                {professionalEcosystemNodes.map((node, index) => (
                  <React.Fragment key={node.id}>
                    <div className="flex justify-center">
                      <NodeBlock
                        node={node}
                        isHovered={hoveredNodeId === node.id}
                        isConnected={isConnected(node.id)}
                        isDimmed={Boolean(hoveredNodeId && !isConnected(node.id))}
                        onHover={() => setHoveredNodeId(node.id)}
                      />
                    </div>
                    {index < professionalEcosystemNodes.length - 1 && (
                      <div className="flex justify-center my-2">
                        <div className="w-px h-8 bg-[#1A1A1A]/30 relative flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-[#1A1A1A]"></div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Map Legend Footer */}
            <div className="pt-6 border-t border-[#E5E5E2] flex flex-wrap items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/60 gap-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#1A1A1A]"></span> {language === 'id' ? 'Node Aktif' : 'Active Node'}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 border border-[#1A1A1A]"></span> {language === 'id' ? 'Alur Terhubung' : 'Connected Flow'}
                </span>
              </div>
              <div>
                <span>{language === 'id' ? 'Kontinuitas Arsitektur: Terverifikasi' : 'Architectural Continuity: Verified'}</span>
              </div>
            </div>
          </div>

          {/* Contextual Detail Inspector Card */}
          <div className="lg:col-span-4 bg-[#F9F8F6] border border-[#1A1A1A] p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E2]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50">
                {language === 'id' ? 'Inspektur Konteks Node' : 'Node Context Inspector'}
              </span>
              {activeProductData && <StatusBadge status={activeProductData.status} size="sm" />}
            </div>

            {activeProductData && activeNodeData ? (
              <motion.div
                key={activeProductData.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#1A1A1A]/40 mb-1">
                    {language === 'id' ? 'Identitas Sistem' : 'System Identity'}
                  </div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A]">
                    {activeProductData.name}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/60 font-mono mt-1">
                    {activeNodeData.role}
                  </p>

                  {/* Published Domain */}
                  {activeProductData.domain && (
                    <div className="mt-2.5">
                      <a
                        href={activeProductData.liveUrl || `https://${activeProductData.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F4F3F0] hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-[#F9F8F6] border border-[#E5E5E2] hover:border-[#1A1A1A] text-[11px] font-mono transition-colors"
                      >
                        <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse"></span>
                        <span>{activeProductData.domain}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#F4F3F0] border border-[#E5E5E2]">
                  <div className="text-[10px] font-mono uppercase text-[#1A1A1A]/50 mb-1">
                    {language === 'id' ? 'Filosofi Utama' : 'Core Philosophy'}
                  </div>
                  <p className="text-xs text-[#1A1A1A] italic">
                    "{activeProductData.tagline}"
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase text-[#1A1A1A]/50">
                    {language === 'id' ? 'Deskripsi Sistem' : 'System Description'}
                  </div>
                  <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-sans">
                    {activeProductData.description}
                  </p>
                </div>

                {activeProductData.architectureNote && (
                  <div className="pt-4 border-t border-[#E5E5E2] space-y-1">
                    <div className="text-[10px] font-mono uppercase text-[#1A1A1A]/50 flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#1A1A1A]" />
                      {language === 'id' ? 'Hubungan Ekosistem' : 'Ecosystem Relationship'}
                    </div>
                    <p className="text-xs text-[#1A1A1A]/70 font-mono leading-normal">
                      {activeProductData.architectureNote}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-[#E5E5E2] flex items-center justify-between text-[10px] font-mono text-[#1A1A1A] flex-wrap gap-2">
                  <span>
                    {language === 'id'
                      ? `Tautan Terhubung: ${activeNodeData.connectsTo.length + activeNodeData.connectedFrom.length}`
                      : `Connected Links: ${activeNodeData.connectsTo.length + activeNodeData.connectedFrom.length}`}
                  </span>
                  <div className="flex items-center gap-3">
                    {activeProductData.liveUrl && (
                      <a
                        href={activeProductData.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-[#1A1A1A] text-[#F9F8F6] hover:bg-[#D95D7D] font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1"
                      >
                        <span>{language === 'id' ? 'Buka Aplikasi' : 'Launch App'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href="#products"
                      className="underline font-bold uppercase tracking-wider hover:text-[#D95D7D]"
                    >
                      {language === 'id' ? 'Lihat Detail →' : 'View Product →'}
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-xs font-mono text-[#1A1A1A]/50 py-12 text-center">
                {language === 'id'
                  ? 'Pilih atau sorot modul dalam peta untuk melihat detail arsitekturnya.'
                  : 'Select or hover over any node in the map to reveal details.'}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface NodeBlockProps {
  node: EcosystemMapNode;
  isHovered: boolean;
  isConnected: boolean;
  isDimmed: boolean;
  isCentralHub?: boolean;
  onHover: () => void;
}

const NodeBlock: React.FC<NodeBlockProps> = ({
  node,
  isHovered,
  isConnected,
  isDimmed,
  isCentralHub,
  onHover
}) => {
  return (
    <div
      onMouseEnter={onHover}
      onClick={onHover}
      tabIndex={0}
      onFocus={onHover}
      className={`p-3.5 sm:p-4 transition-all duration-200 border cursor-pointer select-none text-left w-full sm:w-auto sm:min-w-[190px] max-w-full ${
        isCentralHub
          ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D]'
          : 'bg-[#F9F8F6] text-[#1A1A1A] border-[#E5E5E2]'
      } ${
        isHovered
          ? 'ring-1 ring-[#D95D7D] border-[#D95D7D] shadow-[0_0_16px_rgba(217,93,125,0.2)] scale-102 z-30'
          : isConnected
          ? 'border-[#D95D7D] shadow-xs'
          : ''
      } ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <span className="text-[9px] font-mono uppercase tracking-widest opacity-60">
          {node.category} Node
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isHovered || isConnected || isCentralHub ? 'bg-[#D95D7D]' : 'bg-[#1A1A1A]'
          }`}
        ></span>
      </div>
      <div className="text-sm font-bold tracking-tight">{node.name}</div>
      <div className="text-[10px] font-mono opacity-70 truncate mt-0.5">
        {node.role}
      </div>
    </div>
  );
};
