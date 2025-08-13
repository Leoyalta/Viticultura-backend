import createHttpError from 'http-errors';
import * as authServices from '../services/auth.js';

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(createHttpError(401, 'Authorizatin header not found'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(
      createHttpError(401, 'Authorizatin header must have Bearer type'),
    );
  }
  const session = await authServices.findSessionByAccessToken(token);
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }
  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }
  const user = await authServices.findUser({ _id: session.userId });
  if (!user) {
    return next(createHttpError(401, 'User does not exist'));
  }

  req.user = user;

  next();
};

export default authenticate;
