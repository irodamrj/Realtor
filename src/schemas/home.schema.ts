import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type HomeDocument = HydratedDocument<Home>;

enum PropertyType {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  CONDO = 'condo',
}

@Schema({ timestamps: true })
export class Home {
  @Prop({ required: true })
  adress: string;

  @Prop({ required: true })
  numOfBedrooms: number;
  @Prop({ required: true })
  numOfBathrooms: number;
  @Prop({ required: true })
  city: string;
  @Prop({ default: Date.now })
  listedDate: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  landSize: number;
  @Prop({ type: String, enum: PropertyType, default: PropertyType.HOUSE })
  propertyType: PropertyType;
  @Prop({ type: [String], required: true })
  url: string[];

  @Prop({ type: Types.ObjectId, ref: User.name }) // Reference to the User schema
  owner: User;
}

export const HomeSchema = SchemaFactory.createForClass(Home);
