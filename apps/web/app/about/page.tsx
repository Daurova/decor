import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold">О компании</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          GLORITER — российский бренд декоративных панелей и дизайнерского освещения.
        </p>
      </section>

      {/* Обучающие видео */}
      <section>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">📹 Обучающие видео</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder"
              title="Как монтировать панели"
              allowFullScreen
            />
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder2"
              title="Светодизайн интерьера"
              allowFullScreen
            />
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder3"
              title="Сотрудничество с дизайнерами"
              allowFullScreen
            />
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=placeholder4"
              title="Как выбрать освещение"
              allowFullScreen
            />
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Больше видео на нашем <a href="https://youtube.com" target="_blank" className="text-primary-border hover:underline">YouTube-канале</a>.
        </p>
      </section>

      {/* Сотрудничество с Китаем */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">🤝 Сотрудничество с Китаем</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              Мы напрямую работаем с проверенными фабриками в Гуанчжоу и Шэньчжэне. Это позволяет нам предлагать лучшие цены и уникальные коллекции декоративных панелей и светильников, которые не представлены у конкурентов.
            </p>
            <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-200">
              <li>✅ Собственный контроль качества на производстве</li>
              <li>✅ Прямые контракты без посредников</li>
              <li>✅ Эксклюзивные модели под заказ</li>
              <li>✅ Оптимизация логистики (море / ж/д / авиа)</li>
            </ul>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="font-medium">Партнёрский офис в Китае:</p>
            <p className="text-sm mt-1">Room 801, Huarong Building, Tianhe District, Guangzhou</p>
            <p className="text-sm">🇨🇳 Китай, Гуанчжоу</p>
            <a href="mailto:china@gloriter.com" className="text-primary-border text-sm hover:underline mt-2 inline-block">china@gloriter.com</a>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section>
        <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-6">📞 Контакты</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <PhoneIcon className="h-6 w-6 text-primary-border flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Телефон</h3>
              <p className="text-gray-600 dark:text-gray-300">+7 (495) 123-45-67</p>
              <p className="text-sm text-gray-500">Пн–Пт, 10:00–19:00</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <EnvelopeIcon className="h-6 w-6 text-primary-border flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>info@gloriter.com</p>
              <p className="text-sm text-gray-500">Для дизайнеров: design@gloriter.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <MapPinIcon className="h-6 w-6 text-primary-border flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold">Адрес</h3>
              <p>г. Москва, ул. Тверская, д. 15, офис 401</p>
              <p className="text-sm text-gray-500">Шоу-рум по предварительной записи</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}