# SkyPro Fitness Pro

<b><i>Веб-приложение для фитнеса с курсами и тренировками.
Проект реализован на стеке Next.js + TypeScript.</b><i>

---

## 🌐 Демо

🔗 Production (Vercel):
https://skypro-fitnes-pro.vercel.app/

## 📱 Мобильная версия

Приложение полностью адаптировано под мобильные устройства.

## 🚀 Технологии

* TypeScript
* Next.js
* ESLint
* Prettier
* Jest
* React Testing Library
* OpenNext + Cloudflare

## 📦 Установка и запуск
1. Клонирование репозитория
```bash
    git clone https://github.com/akhorolich/skypro-fitnes-pro.git
    |
    |
    cd skypro-fitnes-pro
```

2. Установка зависимостей
```bash
    npm install
    # или
    yarn install
```

3. Переменные окружения

```bash
    #Create .env
    NEXT_PUBLIC_API_URL=your_api_url
```

## 🧑‍💻 Запуск проекта
```bash
#Режим разработки
npm run dev

#Сборка проекта
npm run build

#Production запуск
npm start
```

## 🧪 Тестирование (jest)

```bash
npm run test
```

## 📁 Структура проекта
```scss
src
├── app
│   ├── (home)
│   ├── course-info
│   ├── profile
│   ├── providers
│   └── workout-lesson
├── components
│   ├── page
│   └── ui
├── features
│   ├── auth
│   ├── courses
│   ├── lessons
│   └── profile
└── shared
    ├── api
    ├── axios
    ├── config
    ├── context
    ├── hooks
    ├── lib
    └── ui
```