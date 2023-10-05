import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserType {
  BUYER = 'buyer',
  REALTOR = 'realtor',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  phone: string;
  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    type: String,
    validate: {
      validator: function (value: string) {
        // Use a regular expression to validate the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    unique: true,
  })
  email: string;

  @Prop({ type: String, enum: UserType })
  userType: UserType;
}

export const UserSchema = SchemaFactory.createForClass(User);
