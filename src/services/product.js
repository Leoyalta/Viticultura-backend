import ProductCollection from '../db/models/Product.js';

export const getAllMovies = () => {
  return ProductCollection.find();
};

export const getMovie = (id) => {
  return ProductCollection.findById(id);
};
