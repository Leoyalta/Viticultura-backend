export const handleServerError = (error, data, next) => {
  error.status = 400;
  next(); //this is not an express next, its a next from mongoose
};

export const setUpdateOptions = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

export function attachStockHook(next) {
  if (this.isNew && this.stock === undefined) {
    this.stock = this.total;
  }
  next();
}
