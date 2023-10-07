require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/UnauthorisedError');

module.exports.auth = (req, res, next) => {
  const authorization = req.headers.authorisation;
  console.log('req headers', req.headers);
  console.log('auth var', authorization);
  if (!authorization) {
    console.log('1st err');
    next(new UnauthorisedError('Необходима авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  console.log('test', token);
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log('2nd err');
    next(new UnauthorisedError('Неправильный логин или пароль'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
