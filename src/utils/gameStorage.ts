import { Currency, Upgrade, Achievement } from '@/components/game/types';

interface GameState {
  currency: Currency;
  clickPower: number;
  autoGoldPerSecond: number;
  totalClicks: number;
  upgrades: Upgrade[];
  achievements: Achievement[];
  lastSaved: number;
}

const STORAGE_KEY = 'fantasy-clicker-save';
const AUTOSAVE_INTERVAL = 5000;

export const saveGame = (state: Omit<GameState, 'lastSaved'>): void => {
  try {
    const gameState: GameState = {
      ...state,
      lastSaved: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game:', error);
  }
};

export const loadGame = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    
    const gameState: GameState = JSON.parse(saved);
    return gameState;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
};

export const resetGame = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset game:', error);
  }
};

export const getAutoSaveInterval = (): number => AUTOSAVE_INTERVAL;
