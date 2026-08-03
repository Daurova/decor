import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary">О компании</h1>
          <p className="mt-4 text-secondary/70 text-base md:text-lg font-light tracking-wide max-w-2xl mx-auto">
            GLORITER — российский бренд декоративных панелей и дизайнерского освещения.
          </p>
          <div className="w-16 h-1 bg-primary/40 mx-auto mt-4 rounded-full" />
        </section>

        {/* Обучающие видео */}
        <section>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-secondary mb-6">
            📹 Обучающие видео
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder"
                title="Как монтировать панели"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder2"
                title="Светодизайн интерьера"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder3"
                title="Сотрудничество с дизайнерами"
                allowFullScreen
              />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder4"
                title="Как выбрать освещение"
                allowFullScreen
              />
            </div>
          </div>
          <p className="text-sm text-secondary/40 text-center mt-4 font-light tracking-wide">
            Больше видео на нашем{' '}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors hover:underline font-medium"
            >
              YouTube-канале
            </a>
            .
          </p>
        </section>

        {/* Сотрудничество с Китаем */}
        <section className="bg-surface/70 backdrop-blur-sm border border-border/10 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-secondary mb-4">
            🤝 Сотрудничество с Китаем
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-secondary/70 leading-relaxed font-light">
                Мы напрямую работаем с проверенными фабриками в Гуанчжоу и Шэньчжэне. Это позволяет нам предлагать лучшие цены и уникальные коллекции декоративных панелей и светильников, которые не представлены у конкурентов.
              </p>
              <ul className="mt-4 space-y-2 text-secondary/70 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <span>Собственный контроль качества на производстве</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <span>Прямые контракты без посредников</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <span>Эксклюзивные модели под заказ</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✅</span>
                  <span>Оптимизация логистики (море / ж/д / авиа)</span>
                </li>
              </ul>
            </div>
            <div className="bg-surface/50 dark:bg-surface/30 rounded-xl p-4 text-center border border-border/10">
              <p className="font-heading font-semibold text-secondary">Партнёрский офис в Китае:</p>
              <p className="text-sm mt-1 text-secondary/60 font-light">
                Room 801, Huarong Building, Tianhe District, Guangzhou
              </p>
              <p className="text-sm text-secondary/60 font-light">🇨🇳 Китай, Гуанчжоу</p>
              <a
                href="mailto:china@gloriter.com"
                className="text-primary hover:text-primary/80 transition-colors text-sm hover:underline mt-2 inline-block font-medium"
              >
                china@gloriter.com
              </a>
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-secondary mb-6">
            📞 Контакты
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/10">
              <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-semibold text-secondary">Телефон</h3>
                <p className="text-secondary/70">+7 (495) 123-45-67</p>
                <p className="text-sm text-secondary/40 font-light">Пн–Пт, 10:00–19:00</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/10">
              <EnvelopeIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-semibold text-secondary">Email</h3>
                <p className="text-secondary/70">info@gloriter.com</p>
                <p className="text-sm text-secondary/40 font-light">Для дизайнеров: design@gloriter.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/10">
              <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading font-semibold text-secondary">Адрес</h3>
                <p className="text-secondary/70">г. Москва, ул. Тверская, д. 15, офис 401</p>
                <p className="text-sm text-secondary/40 font-light">Шоу-рум по предварительной записи</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}