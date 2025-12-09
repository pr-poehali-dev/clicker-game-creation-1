import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const InfoTab = () => {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-border p-6">
      <h2 className="text-2xl font-fantasy mb-4 flex items-center gap-2">
        <Icon name="Info" size={28} />
        Как играть
      </h2>
      <div className="space-y-4 text-muted-foreground">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">🎯 Основы</h3>
          <p>Кликайте по магическому порталу, чтобы добывать золото. Используйте ресурсы для покупки улучшений и увеличения дохода.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">💰 Валюты</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><span className="text-[hsl(var(--gold))]">Золото</span> - основная валюта для улучшений</li>
            <li><span className="text-[hsl(var(--crystal))]">Кристаллы</span> - редкий ресурс для мощных улучшений</li>
            <li><span className="text-[hsl(var(--mithril))]">Мифрил</span> - легендарный металл для эпических улучшений</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">🛒 Улучшения</h3>
          <p>В магазине можно купить улучшения, которые увеличивают силу клика или добавляют автоматический доход.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">🏆 Достижения</h3>
          <p>Выполняйте задания и открывайте достижения, чтобы стать настоящей легендой!</p>
        </div>
      </div>
    </Card>
  );
};

export default InfoTab;
