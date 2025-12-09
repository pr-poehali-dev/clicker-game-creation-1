export interface Currency {
  gold: number;
  crystals: number;
  mithril: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: Currency;
  effect: string;
  level: number;
  maxLevel: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: number;
  progress: number;
  unlocked: boolean;
  icon: string;
  reward: Currency;
}

export interface Leader {
  rank: number;
  name: string;
  gold: number;
}
