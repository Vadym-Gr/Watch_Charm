# WatchCharm

Адаптивний сайт каталогу годинників за макетом Figma. Стек: Vite, семантичний
HTML, CSS і JavaScript. Перший етап готує основу; секції реалізуються поступово.

[Макет Figma](https://www.figma.com/design/Dk5XXe4TZu1UlesbMBLnbU/WatchCharm--Copy-?node-id=0-1)

## Локальний запуск

Потрібен Node.js 24 (див. `.nvmrc`).

```sh
npm ci
npm run dev
```

Відкрити адресу, яку виведе Vite, зазвичай http://localhost:5173/. У Windows
PowerShell із заблокованими `.ps1` використовуй `npm.cmd` замість `npm`.

## Команди

```sh
npm run build
npm run preview
npm run format
npm run format:check
```

Збірка потрапляє в `dist/`. Для GitHub Pages задано базовий шлях
`/Watch_Charm/`. Після push у `main` workflow публікує результат у `gh-pages`. У
Settings → Pages має бути вибрано Deploy from a branch → gh-pages → /(root).

## Структура

- `src/index.html` — документ, метадані та підключення partials.
- `src/partials/` — семантичні блоки сторінки.
- `src/css/index.css` — точка входу стилів, modern-normalize та спільні стилі.
- `src/css/tokens.css` — кольори, шрифт, радіуси та міжсекційні відступи.
- `src/css/container.css` — контейнери для 320–374, 375, 768 і 1280 px.
- `src/css/utilities.css` — допоміжні класи доступності.
- `src/main.js` — точка входу JavaScript.
- `src/img/` — зображення секцій, які додаються на відповідних етапах.
- `src/fonts/` — локальні Gilroy Regular, Medium і Semibold у форматі WOFF2.
- `src/public/favicon.png` — оригінальний фавікон із Figma, 44 × 44 px з
  обводкою.

Gilroy підключено локально через `@font-face` із `font-display: swap`. Джерела
ресурсів зазначені в [документації](docs/assets.md).

## Порядок роботи

[План етапів і погоджені правила](docs/implementation-plan.md). Figma має
пріоритет перед ТЗ. Після кожного етапу робота зупиняється; commit і push
користувач виконує самостійно.

Збережені README іншими мовами описують вихідний шаблон GoIT.
