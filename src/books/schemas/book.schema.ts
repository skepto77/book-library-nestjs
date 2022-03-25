import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  authors: string;

  @Prop({ default: '' })
  favorite: string;

  @Prop({ default: '' })
  fileCover: string;

  @Prop({ default: '' })
  fileName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
