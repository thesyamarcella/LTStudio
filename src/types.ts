export type ProductStatus = 'Daily Driver' | 'Live' | 'In Development' | 'Future';

export interface WorkflowStage {
  id: string;
  label: string;
  description: string;
  iconName?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Personal Life' | 'Professional Life';
  status: ProductStatus;
  tagline: string;
  description: string;
  workflow: string[];
  workflowDetails?: {
    stage: string;
    input: string;
    output: string;
    automationNote: string;
  }[];
  architectureNote?: string;
  connectedTo?: string[];
  isSubdued?: boolean;
  domain?: string;
  liveUrl?: string;
}

export interface MantraStageData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface EngineStageData {
  number: string;
  title: string;
  description: string;
  example: string;
}

export interface PrincipleData {
  title: string;
  subtitle: string;
  description: string;
}

export interface EcosystemMapNode {
  id: string;
  name: string;
  status: ProductStatus;
  category: 'Personal' | 'Professional';
  role: string;
  tagline: string;
  connectsTo: string[];
  connectedFrom: string[];
  level: number; // For layout positioning
  domain?: string;
  liveUrl?: string;
}
