import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Currency, Upgrade } from './types';

interface ShopTabProps {
  upgrades: Upgrade[];
  currency: Currency;
  onBuyUpgrade: (upgrade: Upgrade) => void;
}

const ShopTab = ({ upgrades, currency, onBuyUpgrade }: ShopTabProps) => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border p-6">
      <h2 className="text-2xl font-fantasy mb-4 flex items-center gap-2">
        <Icon name="ShoppingCart" size={28} />
        Магазин улучшений
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upgrades.map((upgrade) => (
          <Card key={upgrade.id} className="bg-muted/50 p-4 border-border">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{upgrade.name}</h3>
                <p className="text-sm text-muted-foreground">{upgrade.description}</p>
              </div>
              <Badge variant={upgrade.level >= upgrade.maxLevel ? 'secondary' : 'default'}>
                Ур. {upgrade.level}/{upgrade.maxLevel}
              </Badge>
            </div>
            <div className="text-sm text-accent mb-3">{upgrade.effect}</div>
            <div className="flex items-center gap-3 mb-3 text-sm">
              {upgrade.cost.gold > 0 && (
                <span className="flex items-center gap-1">
                  <Icon name="Coins" size={16} className="text-[hsl(var(--gold))]" />
                  {upgrade.cost.gold}
                </span>
              )}
              {upgrade.cost.crystals > 0 && (
                <span className="flex items-center gap-1">
                  <Icon name="Gem" size={16} className="text-[hsl(var(--crystal))]" />
                  {upgrade.cost.crystals}
                </span>
              )}
              {upgrade.cost.mithril > 0 && (
                <span className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-[hsl(var(--mithril))]" />
                  {upgrade.cost.mithril}
                </span>
              )}
            </div>
            <Button
              onClick={() => onBuyUpgrade(upgrade)}
              disabled={
                upgrade.level >= upgrade.maxLevel ||
                currency.gold < upgrade.cost.gold ||
                currency.crystals < upgrade.cost.crystals ||
                currency.mithril < upgrade.cost.mithril
              }
              className="w-full"
            >
              {upgrade.level >= upgrade.maxLevel ? 'Максимум' : 'Купить'}
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default ShopTab;
