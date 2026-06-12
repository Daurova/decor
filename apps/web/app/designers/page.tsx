import { EnvelopeIcon, CheckBadgeIcon, TruckIcon, CubeIcon } from '@heroicons/react/24/outline';

export default function DesignersPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">Дизайнерам</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Станьте официальным партнёром GLORITER и получите эксклюзивные условия
        </p>
      </section>

      {/* Преимущества */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm text-center">
          <CheckBadgeIcon className="h-10 w-10 text-primary-border mx-auto" />
          <h3 className="mt-3 font-semibold text-lg">Специальные цены</h3>
          <p className="text-sm text-gray-500">Персональная скидка от 15% на весь ассортимент</p>
        </div>
        <div className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm text-center">
          <TruckIcon className="h-10 w-10 text-primary-border mx-auto" />
          <h3 className="mt-3 font-semibold text-lg">Бесплатная доставка</h3>
          <p className="text-sm text-gray-500">При заказе от 50 000 ₽ по Москве и СПБ</p>
        </div>
        <div className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm text-center">
          <CubeIcon className="h-10 w-10 text-primary-border mx-auto" />
          <h3 className="mt-3 font-semibold text-lg">Образцы материалов</h3>
          <p className="text-sm text-gray-500">Бесплатные образцы панелей и освещения</p>
        </div>
      </section>

      {/* Текст приглашения */}
      <section className="bg-gradient-to-r from-primary-border/10 to-transparent p-6 md:p-8 rounded-2xl">
        <h2 className="text-2xl font-heading font-semibold">Как начать сотрудничество?</h2>
        <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-200">
          <p>1. Заполните короткую форму или напишите нам на почту.</p>
          <p>2. Мы свяжемся с вами и обсудим персональные условия.</p>
          <p>3. Получите доступ к закрытому каталогу и прайс-листу.</p>
        </div>
      </section>

      {/* Контакты / Форма */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-heading font-semibold mb-4">Связаться с отделом по работе с дизайнерами</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-5 w-5 text-primary-border" />
            <a href="mailto:design@gloriter.com" className="text-primary-border hover:underline">design@gloriter.com</a>
          </div>
          <span className="text-gray-400">или</span>
          <a
            href="https://t.me/gloriter_design"
            target="_blank"
            className="px-5 py-2 bg-primary-border text-white rounded-full hover:bg-primary-border/80 transition"
          >
            Написать в Telegram
          </a>
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">Обычно отвечаем в течение 3 часов в рабочие дни</p>
      </section>
    </div>
  );
}