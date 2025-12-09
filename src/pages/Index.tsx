import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Currency, Upgrade, Achievement, Leader } from '@/components/game/types';
import GamePortal from '@/components/game/GamePortal';
import ShopTab from '@/components/game/ShopTab';
import AchievementsTab from '@/components/game/AchievementsTab';
import LeaderboardTab from '@/components/game/LeaderboardTab';
import InfoTab from '@/components/game/InfoTab';

const Index = () => {
  const [currency, setCurrency] = useState<Currency>({ gold: 0, crystals: 0, mithril: 0 });
  const [clickPower, setClickPower] = useState(1);
  const [autoGoldPerSecond, setAutoGoldPerSecond] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: 'click-power-1',
      name: 'Заточка меча',
      description: 'Увеличивает силу клика на 1',
      cost: { gold: 10, crystals: 0, mithril: 0 },
      effect: '+1 золота за клик',
      level: 0,
      maxLevel: 10,
    },
    {
      id: 'click-power-2',
      name: 'Рунический клинок',
      description: 'Значительно усиливает удары',
      cost: { gold: 100, crystals: 5, mithril: 0 },
      effect: '+5 золота за клик',
      level: 0,
      maxLevel: 5,
    },
    {
      id: 'auto-gold-1',
      name: 'Гоблины-рудокопы',
      description: 'Добывают золото автоматически',
      cost: { gold: 50, crystals: 0, mithril: 0 },
      effect: '+1 золота/сек',
      level: 0,
      maxLevel: 20,
    },
    {
      id: 'auto-gold-2',
      name: 'Древняя шахта',
      description: 'Производство кристаллов и золота',
      cost: { gold: 500, crystals: 10, mithril: 1 },
      effect: '+10 золота/сек, +1 кристалл/мин',
      level: 0,
      maxLevel: 10,
    },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'clicks-10', name: 'Новичок', description: 'Сделать 10 кликов', requirement: 10, progress: 0, unlocked: false, icon: 'Sparkles', reward: { gold: 20, crystals: 0, mithril: 0 } },
    { id: 'clicks-100', name: 'Воин', description: 'Сделать 100 кликов', requirement: 100, progress: 0, unlocked: false, icon: 'Sword', reward: { gold: 100, crystals: 2, mithril: 0 } },
    { id: 'clicks-1000', name: 'Герой', description: 'Сделать 1000 кликов', requirement: 1000, progress: 0, unlocked: false, icon: 'Crown', reward: { gold: 1000, crystals: 10, mithril: 1 } },
    { id: 'gold-100', name: 'Богач', description: 'Накопить 100 золота', requirement: 100, progress: 0, unlocked: false, icon: 'Coins', reward: { gold: 50, crystals: 1, mithril: 0 } },
    { id: 'gold-1000', name: 'Золотая лихорадка', description: 'Накопить 1000 золота', requirement: 1000, progress: 0, unlocked: false, icon: 'TrendingUp', reward: { gold: 500, crystals: 5, mithril: 0 } },
    { id: 'crystals-10', name: 'Коллекционер', description: 'Накопить 10 кристаллов', requirement: 10, progress: 0, unlocked: false, icon: 'Gem', reward: { gold: 200, crystals: 5, mithril: 1 } },
  ]);

  const [leaderboard] = useState<Leader[]>([
    { rank: 1, name: 'Артас Повелитель', gold: 50000 },
    { rank: 2, name: 'Эльфийская магия', gold: 35000 },
    { rank: 3, name: 'Драконий клад', gold: 28000 },
    { rank: 4, name: 'Лесной хранитель', gold: 15000 },
    { rank: 5, name: 'Тёмный маг', gold: 12000 },
    { rank: 6, name: 'Вы', gold: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoGoldPerSecond > 0) {
        setCurrency((prev) => ({
          ...prev,
          gold: prev.gold + autoGoldPerSecond,
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [autoGoldPerSecond]);

  useEffect(() => {
    checkAchievements();
  }, [totalClicks, currency]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle = { id: Date.now(), x, y };
    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);

    setCurrency((prev) => ({
      ...prev,
      gold: prev.gold + clickPower,
    }));
    setTotalClicks((prev) => prev + 1);
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    if (upgrade.level >= upgrade.maxLevel) {
      toast.error('Достигнут максимальный уровень улучшения');
      return;
    }

    const canAfford =
      currency.gold >= upgrade.cost.gold &&
      currency.crystals >= upgrade.cost.crystals &&
      currency.mithril >= upgrade.cost.mithril;

    if (!canAfford) {
      toast.error('Недостаточно ресурсов');
      return;
    }

    setCurrency({
      gold: currency.gold - upgrade.cost.gold,
      crystals: currency.crystals - upgrade.cost.crystals,
      mithril: currency.mithril - upgrade.cost.mithril,
    });

    setUpgrades((prev) =>
      prev.map((u) => {
        if (u.id === upgrade.id) {
          const newLevel = u.level + 1;
          const costMultiplier = 1.5;
          return {
            ...u,
            level: newLevel,
            cost: {
              gold: Math.floor(u.cost.gold * costMultiplier),
              crystals: Math.floor(u.cost.crystals * costMultiplier),
              mithril: Math.floor(u.cost.mithril * costMultiplier),
            },
          };
        }
        return u;
      })
    );

    if (upgrade.id.startsWith('click-power')) {
      const powerIncrease = upgrade.id === 'click-power-1' ? 1 : 5;
      setClickPower((prev) => prev + powerIncrease);
    } else if (upgrade.id.startsWith('auto-gold')) {
      const autoIncrease = upgrade.id === 'auto-gold-1' ? 1 : 10;
      setAutoGoldPerSecond((prev) => prev + autoIncrease);
    }

    toast.success(`Улучшение "${upgrade.name}" куплено!`);
  };

  const checkAchievements = () => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        let currentProgress = 0;

        if (achievement.id.startsWith('clicks-')) {
          currentProgress = totalClicks;
        } else if (achievement.id.startsWith('gold-')) {
          currentProgress = currency.gold;
        } else if (achievement.id.startsWith('crystals-')) {
          currentProgress = currency.crystals;
        }

        const wasUnlocked = achievement.unlocked;
        const isNowUnlocked = currentProgress >= achievement.requirement;

        if (!wasUnlocked && isNowUnlocked) {
          setCurrency((prevCurrency) => ({
            gold: prevCurrency.gold + achievement.reward.gold,
            crystals: prevCurrency.crystals + achievement.reward.crystals,
            mithril: prevCurrency.mithril + achievement.reward.mithril,
          }));
          
          const rewardText = [];
          if (achievement.reward.gold > 0) rewardText.push(`${achievement.reward.gold} золота`);
          if (achievement.reward.crystals > 0) rewardText.push(`${achievement.reward.crystals} кристаллов`);
          if (achievement.reward.mithril > 0) rewardText.push(`${achievement.reward.mithril} мифрила`);
          
          toast.success(`🏆 Достижение разблокировано: ${achievement.name}`, {
            description: `${achievement.description}. Награда: ${rewardText.join(', ')}`,
          });
        }

        return {
          ...achievement,
          progress: currentProgress,
          unlocked: isNowUnlocked,
        };
      })
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c1a] via-[#1a1425] to-[#1a1f2c] text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMCAyMmMtNS41MjMgMC0xMC00LjQ3Ny0xMC0xMHM0LjQ3Ny0xMCAxMC0xMCAxMCA0LjQ3NyAxMCAxMC00LjQ3NyAxMC0xMCAxMHoiIGZpbGw9IiM5Yjg3ZjUiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold font-fantasy text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary mb-2">
            Королевство Кликов
          </h1>
          <p className="text-muted-foreground text-lg">Собирай ресурсы и стань легендой</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name="Coins" className="text-[hsl(var(--gold))]" size={24} />
                <span className="text-lg font-semibold">Золото</span>
              </div>
              <span className="text-2xl font-bold text-[hsl(var(--gold))]">{formatNumber(currency.gold)}</span>
            </div>
            <div className="text-sm text-muted-foreground">+{autoGoldPerSecond}/сек</div>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name="Gem" className="text-[hsl(var(--crystal))]" size={24} />
                <span className="text-lg font-semibold">Кристаллы</span>
              </div>
              <span className="text-2xl font-bold text-[hsl(var(--crystal))]">{formatNumber(currency.crystals)}</span>
            </div>
            <div className="text-sm text-muted-foreground">Редкий ресурс</div>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name="Star" className="text-[hsl(var(--mithril))]" size={24} />
                <span className="text-lg font-semibold">Мифрил</span>
              </div>
              <span className="text-2xl font-bold text-[hsl(var(--mithril))]">{formatNumber(currency.mithril)}</span>
            </div>
            <div className="text-sm text-muted-foreground">Легендарный металл</div>
          </Card>
        </div>

        <Tabs defaultValue="game" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="game">
              <Icon name="Sparkles" size={18} className="mr-2" />
              Игра
            </TabsTrigger>
            <TabsTrigger value="shop">
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              Магазин
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Icon name="Trophy" size={18} className="mr-2" />
              Достижения
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <Icon name="Award" size={18} className="mr-2" />
              Лидеры
            </TabsTrigger>
            <TabsTrigger value="info">
              <Icon name="Info" size={18} className="mr-2" />
              Инфо
            </TabsTrigger>
          </TabsList>

          <TabsContent value="game" className="space-y-6">
            <GamePortal
              clickPower={clickPower}
              totalClicks={totalClicks}
              particles={particles}
              onPortalClick={handleClick}
            />
          </TabsContent>

          <TabsContent value="shop" className="space-y-4">
            <ShopTab
              upgrades={upgrades}
              currency={currency}
              onBuyUpgrade={buyUpgrade}
            />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <AchievementsTab achievements={achievements} />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <LeaderboardTab
              leaderboard={leaderboard}
              formatNumber={formatNumber}
            />
          </TabsContent>

          <TabsContent value="info" className="space-y-4">
            <InfoTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
