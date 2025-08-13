import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateOptions } from './mongooseHooks.js';
import { emailRegExp } from '../../constants/clients.js';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, 'El campo "userName" es obligatorio.'],
      minlength: [2, 'El campo "userName" debe tener al menos 2 caracteres.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El campo "email" es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return emailRegExp.test(v);
        },
        message: () =>
          'El campo "email" debe tener un formato válido, por ejemplo: mango@gmail.com.',
      },
    },
    password: {
      type: String,
      required: [true, 'El campo "password" es obligatorio.'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.post('save', handleSaveError);
userSchema.pre('findOneAndUpdate', setUpdateOptions);
userSchema.post('findOneAndUpdate', handleSaveError);

const UserCollection = model('user', userSchema);

export default UserCollection;
