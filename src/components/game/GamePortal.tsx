import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GamePortalProps {
  clickPower: number;
  totalClicks: number;
  particles: Array<{ id: number; x: number; y: number }>;
  onPortalClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const GamePortal = ({ clickPower, totalClicks, particles, onPortalClick }: GamePortalProps) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border p-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-fantasy mb-2">Магический портал</h2>
        <p className="text-muted-foreground">Кликай по порталу, чтобы добыть золото</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Icon name="Zap" size={16} className="mr-2" />
            Сила клика: {clickPower}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Icon name="MousePointerClick" size={16} className="mr-2" />
            Кликов: {totalClicks}
          </Badge>
        </div>
      </div>

      <div className="flex justify-center">
        <div onClick={onPortalClick} className="relative w-64 h-64 cursor-pointer">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-primary animate-pulse-glow animate-float flex items-center justify-center hover:scale-110 transition-transform duration-200 active:scale-95">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-accent/20 to-primary/40 flex items-center justify-center">
              <Icon name="Sparkles" size={80} className="text-accent" />
            </div>
          </div>
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute text-2xl font-bold text-accent animate-particle pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
              }}
            >
              +{clickPower}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default GamePortal;
