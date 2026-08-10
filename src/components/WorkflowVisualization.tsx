import React from 'react';

interface WorkflowVisualizationProps {
  workflow: string[];
  activeStep?: number;
  onStepClick?: (index: number) => void;
  compact?: boolean;
}

export const WorkflowVisualization: React.FC<WorkflowVisualizationProps> = ({
  workflow,
  activeStep,
  onStepClick,
  compact = false
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {workflow.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div key={step} className="inline-flex items-center gap-2 shrink-0 my-0.5 max-w-full">
              {/* Workflow Step Pill */}
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(idx)}
                className={`inline-flex items-center gap-1.5 transition-all cursor-pointer font-mono border whitespace-nowrap ${
                  compact
                    ? 'px-2 py-1 text-[10px]'
                    : 'px-3 py-1.5 text-[11px]'
                } ${
                  isActive
                    ? 'bg-[#1A1A1A] text-[#F9F8F6] border-[#D95D7D] font-bold shadow-xs'
                    : 'bg-[#F4F3F0] text-[#1A1A1A] border-[#E5E5E2] hover:border-[#D95D7D]/60'
                }`}
              >
                <span className={isActive ? 'text-[#D95D7D] font-bold text-[9px]' : 'opacity-40 text-[9px]'}>0{idx + 1}</span>
                <span className="truncate">{step}</span>
              </button>

              {/* Graphical Node Connector Line */}
              {idx < workflow.length - 1 && (
                <div className="flex items-center text-[#1A1A1A]/30 shrink-0">
                  <span className={`w-2.5 h-px inline-block ${isActive ? 'bg-[#D95D7D]' : 'bg-[#1A1A1A]/30'}`}></span>
                  <span className={`w-1 h-1 rotate-45 inline-block -ml-0.5 ${isActive ? 'bg-[#D95D7D]' : 'bg-[#1A1A1A]/40'}`}></span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
