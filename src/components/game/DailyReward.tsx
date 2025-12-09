import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Currency } from './types';

interface DailyRewardProps {
  onClaim: (reward: Currency) => void;
}

const DAILY_REWARDS: Currency[] = [
  { gold: 100, crystals: 1, mithril: 0 },
  { gold: 150, crystals: 2, mithril: 0 },
  { gold: 200, crystals: 3, mithril: 0 },
  { gold: 300, crystals: 5, mithril: 1 },
  { gold: 500, crystals: 10, mithril: 2 },
  { gold: 750, crystals: 15, mithril: 3 },
  { gold: 1000, crystals: 25, mithril: 5 },
];

const DailyReward = ({ onClaim }: DailyRewardProps) => {
  const [currentDay, setCurrentDay] = useState(0);
  const [canClaim, setCanClaim] = useState(false);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    checkDailyReward();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkDailyReward = () => {
    const lastClaim = localStorage.getItem('daily-reward-last-claim');
    const streak = parseInt(localStorage.getItem('daily-reward-streak') || '0');
    
    if (!lastClaim) {
      setCanClaim(true);
      setCurrentDay(0);
      return;
    }

    const lastClaimDate = new Date(parseInt(lastClaim));
    const now = new Date();
    const hoursSinceLastClaim = (now.getTime() - lastClaimDate.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLastClaim >= 24) {
      setCanClaim(true);
      if (hoursSinceLastClaim < 48) {
        setCurrentDay(Math.min(streak, DAILY_REWARDS.length - 1));
      } else {
        setCurrentDay(0);
      }
    } else {
      setCanClaim(false);
      setCurrentDay(Math.min(streak - 1, DAILY_REWARDS.length - 1));
    }
  };

  const updateTimer = () => {
    const lastClaim = localStorage.getItem('daily-reward-last-claim');
    if (!lastClaim) {
      setTimeUntilNext('Готово к получению!');
      return;
    }

    const lastClaimDate = new Date(parseInt(lastClaim));
    const nextClaim = new Date(lastClaimDate.getTime() + 24 * 60 * 60 * 1000);
    const now = new Date();
    const diff = nextClaim.getTime() - now.getTime();

    if (diff <= 0) {
      setTimeUntilNext('Готово к получению!');
      checkDailyReward();
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setTimeUntilNext(`${hours}ч ${minutes}м ${seconds}с`);
  };

  const handleClaim = () => {
    const reward = DAILY_REWARDS[currentDay];
    onClaim(reward);
    
    const newStreak = currentDay + 1;
    localStorage.setItem('daily-reward-last-claim', Date.now().toString());
    localStorage.setItem('daily-reward-streak', newStreak.toString());
    
    setCanClaim(false);
    checkDailyReward();
  };

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm border-primary/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-fantasy flex items-center gap-2">
          <Icon name="Gift" size={24} className="text-accent" />
          Ежедневная награда
        </h3>
        <Badge variant={canClaim ? "default" : "secondary"} className="text-sm">
          День {currentDay + 1}/7
        </Badge>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {DAILY_REWARDS.map((reward, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg text-center transition-all ${
              index < currentDay
                ? 'bg-primary/20 border-2 border-primary'
                : index === currentDay
                ? 'bg-accent/20 border-2 border-accent animate-pulse'
                : 'bg-muted/50 border border-border'
            }`}
          >
            <div className="text-xs font-bold mb-1">{index + 1}</div>
            <Icon 
              name={index <= currentDay ? "CheckCircle2" : "Circle"} 
              size={16} 
              className={index <= currentDay ? "text-primary mx-auto" : "text-muted-foreground mx-auto"}
            />
          </div>
        ))}
      </div>

      {currentDay < DAILY_REWARDS.length && (
        <div className="bg-card/50 rounded-lg p-4 mb-4">
          <div className="text-sm text-muted-foreground mb-2">Награда дня {currentDay + 1}:</div>
          <div className="flex items-center gap-4">
            {DAILY_REWARDS[currentDay].gold > 0 && (
              <div className="flex items-center gap-1">
                <Icon name="Coins" size={16} className="text-[hsl(var(--gold))]" />
                <span className="font-bold text-[hsl(var(--gold))]">
                  {DAILY_REWARDS[currentDay].gold}
                </span>
              </div>
            )}
            {DAILY_REWARDS[currentDay].crystals > 0 && (
              <div className="flex items-center gap-1">
                <Icon name="Gem" size={16} className="text-[hsl(var(--crystal))]" />
                <span className="font-bold text-[hsl(var(--crystal))]">
                  {DAILY_REWARDS[currentDay].crystals}
                </span>
              </div>
            )}
            {DAILY_REWARDS[currentDay].mithril > 0 && (
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="text-[hsl(var(--mithril))]" />
                <span className="font-bold text-[hsl(var(--mithril))]">
                  {DAILY_REWARDS[currentDay].mithril}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <Button 
        onClick={handleClaim} 
        disabled={!canClaim}
        className="w-full"
        variant={canClaim ? "default" : "secondary"}
      >
        {canClaim ? (
          <>
            <Icon name="Gift" size={16} className="mr-2" />
            Получить награду
          </>
        ) : (
          <>
            <Icon name="Clock" size={16} className="mr-2" />
            {timeUntilNext}
          </>
        )}
      </Button>

      {currentDay >= DAILY_REWARDS.length - 1 && canClaim && (
        <div className="mt-3 text-center text-sm text-accent">
          🎉 Максимальная награда! Серия начнётся заново.
        </div>
      )}
    </Card>
  );
};

export default DailyReward;
