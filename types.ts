
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  PROPERTY_ANALYSIS = 'PROPERTY_ANALYSIS',
  VOICE_AGENT = 'VOICE_AGENT',
  LEGAL_HUB = 'LEGAL_HUB',
  FINANCIAL_ENGINE = 'FINANCIAL_ENGINE'
}

export interface PropertyLead {
  id: string;
  address: string;
  price: number;
  marketValue: number;
  status: 'IDENTIFIED' | 'ANALYZED' | 'NEGOTIATING' | 'CONTRACT_TRIGGERED' | 'CLOSED';
  nexusScore: number;
  motivationDelta: number; // 0-1
  healthScore: number; // 0-1
  distressMarkers: string[];
  ownerInfo: {
    name: string;
    financialStrain: string;
    lastContact: string;
  };
  financials: {
    irr: number;
    npv: number;
    coc: number;
    exitForecast: number;
  };
}

export enum AgentMode {
  ATLAS = 'ATLAS', // Strategic Architect
  SOL = 'SOL'     // Echo - Executive Assistant & Voice
}

export interface GroundingSource {
  title: string;
  uri: string;
}
