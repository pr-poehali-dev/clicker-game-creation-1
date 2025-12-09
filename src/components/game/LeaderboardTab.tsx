import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Leader } from './types';

interface LeaderboardTabProps {
  leaderboard: Leader[];
  formatNumber: (num: number) => string;
}

const LeaderboardTab = ({ leaderboard, formatNumber }: LeaderboardTabProps) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border p-6">
      <h2 className="text-2xl font-fantasy mb-4 flex items-center gap-2">
        <Icon name="Award" size={28} />
        Таблица лидеров
      </h2>
      <div className="space-y-3">
        {leaderboard.map((leader) => (
          <Card
            key={leader.rank}
            className={`p-4 flex items-center justify-between ${
              leader.name === 'Вы'
                ? 'bg-primary/10 border-primary'
                : 'bg-muted/50 border-border'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  leader.rank === 1
                    ? 'bg-yellow-500 text-black'
                    : leader.rank === 2
                    ? 'bg-gray-400 text-black'
                    : leader.rank === 3
                    ? 'bg-orange-600 text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                {leader.rank}
              </div>
              <div>
                <div className="font-semibold">{leader.name}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Icon name="Coins" size={14} className="text-[hsl(var(--gold))]" />
                  {formatNumber(leader.gold)} золота
                </div>
              </div>
            </div>
            {leader.rank <= 3 && (
              <Icon name="Crown" size={24} className="text-[hsl(var(--gold))]" />
            )}
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default LeaderboardTab;
