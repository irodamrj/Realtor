import * as jwt from 'jsonwebtoken';
import { ObjectId, Types } from 'mongoose';

interface Payload {
  name: string;
  id: Types.ObjectId;
}

export const generateJWT = (payload: Payload) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '2d',
  });
  return token;
};
