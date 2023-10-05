import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';
import { Home } from './home.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  message: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  realtor: User;
  @Prop({ type: Types.ObjectId, ref: User.name })
  buyer: User;
  @Prop({ type: Types.ObjectId, ref: Home.name })
  home: Home;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
