# WatchCharm

Адаптивний сайт каталогу годинників за макетом Figma. Стек: Vite, семантичний
HTML, CSS і JavaScript. Готові основа проєкту, адаптивний Header і бічне меню;
інші секції реалізуються поступово.

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

Команда `npm run preview` використовує шлях `/Watch_Charm/`, як GitHub Pages.
Відкривай повну адресу з цим шляхом, яку надрукує Vite.

- `src/index.html` — документ, метадані та підключення partials.
- `src/partials/` — семантичні блоки сторінки.
- `src/css/index.css` — точка входу стилів, modern-normalize та спільні стилі.
- `src/css/tokens.css` — кольори, шрифт, радіуси та міжсекційні відступи.
- `src/css/container.css` — контейнери для 320–374, 375, 768 і 1280 px.
- `src/css/utilities.css` — допоміжні класи доступності.
- `src/main.js` — точка входу JavaScript.
- `src/js/menu.js` — керування бічним меню, фокусом і блокуванням прокручування.
- `src/img/` — зображення секцій, які додаються на відповідних етапах.
- `src/img/header/` — оригінальні іконки Figma та адаптивні фони меню x1/x2.
- `src/fonts/` — локальні Gilroy Regular, Medium і Semibold у форматі WOFF2.
- `src/public/favicon.png` — оригінальний фавікон із Figma, 44 × 44 px з
  обводкою.

Gilroy підключено локально через `@font-face` із `font-display: swap`. Джерела
ресурсів зазначені в [документації](docs/assets.md).

## Переклад

Основна мова сайту — англійська. HTML дозволяє переклад через вбудовані засоби
браузера, зокрема українською та нідерландською. Назва WatchCharm позначена як
така, що не перекладається. Окремого перемикача мов немає.

У Chrome відкрий меню сторінки правою кнопкою миші → «Перекласти», а в
налаштуваннях перекладача вибери українську або нідерландську. Автоматичний
переклад англійських сторінок можна ввімкнути в налаштуваннях мов Chrome. Сайт
не може примусово ввімкнути переклад або гарантувати його якість: це залежить
від браузера та налаштувань відвідувача.

Джерела:
[довідка Chrome](https://support.google.com/chrome/answer/173424?hl=uk),
[атрибут translate](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/translate).

## Порядок роботи

[План етапів і погоджені правила](docs/implementation-plan.md). Figma має
пріоритет перед ТЗ. Після кожного етапу робота зупиняється; commit і push
користувач виконує самостійно.

Збережені README іншими мовами описують вихідний шаблон GoIT.
