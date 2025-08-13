export const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

export const accessTokenLifetime = 1000 * 60 * 15;

export const refreshTokenLifetime = 1000 * 60 * 60 * 24;
