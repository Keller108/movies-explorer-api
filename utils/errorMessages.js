// Общие

const validationErrTxt = 'Вы не заполнили обязательные поля или данные не верны';
const castErrTxt = 'Неправильный запрос';
const serverTxt = 'На сервере произошла ошибка';
const notFoundTxt = 'Запрашиваемый ресурс не найден';

// Пользователь

const userNotFoundTxt = 'Пользователь не найден';
const userExistsTxt = 'Пользователь с таким email уже существует';
const userUnauthorizedTxt = 'Необходимо авторизоваться';
const wrongUserDataTxt = 'Неправильные почта или пароль';

// Фильмы

const movieNotFoundTxt = 'Фильм с указанным _id не найден.';
const movieNotValidTxt = 'Невалидный id фильма.';
const movieForbiddenTxt = 'Удалять можно только свои карточки с фильмами';

module.exports = {
  validationErrTxt,
  castErrTxt,
  serverTxt,
  notFoundTxt,
  userNotFoundTxt,
  userExistsTxt,
  userUnauthorizedTxt,
  wrongUserDataTxt,
  movieNotFoundTxt,
  movieNotValidTxt,
  movieForbiddenTxt,
};
