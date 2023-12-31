# Sotnikov Test App

Выполненное тестовое задание в компанию SOTNIKOV - Digital Studio

Приложение представляет из себя три модуля:

- Посты
- Альбомы с фотографиями
- Список задач

В каждом из модулей реализованы: набор CRUD операций, добавление в избранное с сохранением в LocalStorage, пагинация,
разные виды фильтрации и сортировки данных, простая маршрутизация.
Данные запрашиваются с сервера jsonplaceholder и сохраняются в sessionStorage,
для сохранения изменений в рамках текущей сессии.

## Запуск приложения

Склонируйте репозиторий и выполните следующие команды:

```
$ yarn install
$ yarn dev
```

Ввиду использования библиотеки redux-persist может потребоваться очистка localStorage и sessionStorage через DevTools
Вашего браузера.

## Стэк технологий

- React JS
- Typescript
- Redux Toolkit w Thunks
- Redux Persist
- axios
- React Router Dom
- Vite
- Ant Design
- Styled Components
- ESLint
- Prettier
