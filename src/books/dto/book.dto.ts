import { Schema } from 'mongoose';

export class BookDto {
  _id: Schema.Types.ObjectId;
  title: string;
  description?: string;
  authors?: string;
  favorite?: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}
