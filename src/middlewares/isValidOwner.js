import mongoose from 'mongoose';
import createHttpError from 'http-errors';

const isValidObjectIdQuery = (key) => (req, res, next) => {
  const value = req.query[key];
  if (value && !mongoose.Types.ObjectId.isValid(value)) {
    return next(createHttpError(400, `"${key}" must be a valid ObjectId`));
  }
  next();
};

export default isValidObjectIdQuery;
