import UserCollection from '../db/models/User.js';
import SessionCollection from '../db/models/Session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import {
  accessTokenLifetime,
  refreshTokenLifetime,
} from '../constants/user.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifetime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifetime);

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};
export const signup = async (payload) => {
  const { email, userName, password } = payload;

  const existingEmail = await UserCollection.findOne({ email });
  if (existingEmail) {
    throw createHttpError(409, 'El email ya está registrado.');
  }

  const existingUserName = await UserCollection.findOne({ userName });
  if (existingUserName) {
    throw createHttpError(409, 'El nombre de usuario ya está en uso.');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const data = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });
  delete data._doc.password;

  return data._doc;
};

export const signin = async (payload) => {
  const { userName, email, password } = payload;

  const user = await UserCollection.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    throw createHttpError(401, 'El usuario no existe.');
  }
  await SessionCollection.deleteOne({ userId: user._id });
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw createHttpError(401, 'Contraseña incorrecta.');
  }

  const sessionData = createSession();

  const userSession = await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });

  return userSession;
};

export const findSessionByAccessToken = (accessToken) =>
  SessionCollection.findOne({ accessToken });

export const findUser = (filter) => UserCollection.findOne(filter);

export const refreshSession = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!oldSession) {
    throw createHttpError(401, 'Session not found.');
  }

  if (new Date() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session is expired.');
  }

  await SessionCollection.deleteOne({ _id: sessionId });

  const sessionData = createSession();

  const userSession = await SessionCollection.create({
    userId: oldSession.userId,
    ...sessionData,
  });

  return userSession;
};

export const signout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};
