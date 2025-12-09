import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Achievement } from './types';

interface AchievementsTabProps {
  achievements: Achievement[];
}

const AchievementsTab = ({ achievements }: AchievementsTabProps) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border p-6">
      <h2 className="text-2xl font-fantasy mb-4 flex items-center gap-2">
        <Icon name="Trophy" size={28} />
        Достижения
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`p-4 ${
              achievement.unlocked
                ? 'bg-primary/10 border-primary'
                : 'bg-muted/50 border-border'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-3 rounded-lg ${
                  achievement.unlocked ? 'bg-primary/20' : 'bg-muted'
                }`}
              >
                <Icon
                  name={achievement.icon as any}
                  size={24}
                  className={achievement.unlocked ? 'text-primary' : 'text-muted-foreground'}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">
                  {achievement.name}
                  {achievement.unlocked && <Icon name="Check" size={16} className="text-primary" />}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                <div className="flex items-center gap-2 mb-2 text-xs">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Icon name="Gift" size={12} />
                    Награда:
                  </Badge>
                  {achievement.reward.gold > 0 && (
                    <span className="flex items-center gap-1 text-[hsl(var(--gold))]">
                      <Icon name="Coins" size={12} />
                      {achievement.reward.gold}
                    </span>
                  )}
                  {achievement.reward.crystals > 0 && (
                    <span className="flex items-center gap-1 text-[hsl(var(--crystal))]">
                      <Icon name="Gem" size={12} />
                      {achievement.reward.crystals}
                    </span>
                  )}
                  {achievement.reward.mithril > 0 && (
                    <span className="flex items-center gap-1 text-[hsl(var(--mithril))]">
                      <Icon name="Star" size={12} />
                      {achievement.reward.mithril}
                    </span>
                  )}
                </div>
                <Progress
                  value={(achievement.progress / achievement.requirement) * 100}
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.min(achievement.progress, achievement.requirement)} / {achievement.requirement}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default AchievementsTab;
