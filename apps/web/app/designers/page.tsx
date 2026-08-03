import { EnvelopeIcon, CheckBadgeIcon, TruckIcon, CubeIcon } from '@heroicons/react/24/outline';

export default function DesignersPage() {
  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary">Дизайнерам</h1>
          <p className="mt-4 text-base md:text-lg text-secondary/70 font-light tracking-wide">
            Станьте официальным партнёром GLORITER и получите эксклюзивные условия
          </p>
          <div className="w-16 h-1 bg-primary/40 mx-auto mt-4 rounded-full" />
        </section>

        {/* Преимущества */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="p-5 rounded-xl bg-surface shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/10 text-center">
            <CheckBadgeIcon className="h-10 w-10 text-primary mx-auto" />
            <h3 className="mt-3 font-heading font-semibold text-lg text-secondary">Специальные цены</h3>
            <p className="text-sm text-secondary/60 font-light">Персональная скидка от 15% на весь ассортимент</p>
          </div>
          <div className="p-5 rounded-xl bg-surface shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/10 text-center">
            <TruckIcon className="h-10 w-10 text-primary mx-auto" />
            <h3 className="mt-3 font-heading font-semibold text-lg text-secondary">Бесплатная доставка</h3>
            <p className="text-sm text-secondary/60 font-light">При заказе от 50 000 ₽ по Москве и СПБ</p>
          </div>
          <div className="p-5 rounded-xl bg-surface shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/10 text-center">
            <CubeIcon className="h-10 w-10 text-primary mx-auto" />
            <h3 className="mt-3 font-heading font-semibold text-lg text-secondary">Образцы материалов</h3>
            <p className="text-sm text-secondary/60 font-light">Бесплатные образцы панелей и освещения</p>
          </div>
        </section>

        {/* Текст приглашения */}
        <section className="bg-surface/70 backdrop-blur-sm border border-border/10 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-heading font-semibold text-secondary">Как начать сотрудничество?</h2>
          <div className="mt-4 space-y-2 text-secondary/70 font-light text-base">
            <p>1. Заполните короткую форму или напишите нам на почту.</p>
            <p>2. Мы свяжемся с вами и обсудим персональные условия.</p>
            <p>3. Получите доступ к закрытому каталогу и прайс-листу.</p>
          </div>
        </section>

        {/* Контакты / Форма */}
        <section className="bg-surface border border-border/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-heading font-semibold text-secondary mb-4">
            Связаться с отделом по работе с дизайнерами
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5 text-primary" />
              <a
                href="mailto:design@gloriter.com"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                design@gloriter.com
              </a>
            </div>
            <span className="text-secondary/30">или</span>
            <a
              href="https://t.me/gloriter_design"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 bg-primary text-white rounded-full hover:bg-primary/80 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Написать в Telegram
            </a>
          </div>
          <p className="text-xs text-secondary/40 text-center mt-4 font-light tracking-wide">
            Обычно отвечаем в течение 3 часов в рабочие дни
          </p>
        </section>
      </div>
    </div>
  );
}