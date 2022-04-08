import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(dto: BookDto): Promise<Book> {
    return await this.bookModel.create(dto);
  }

  async getBook(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  async getBooks(): Promise<Array<Book>> {
    return await this.bookModel.find().exec();
  }

  async updateBook(id: string, dto: BookDto): Promise<Book | string> {
    return await this.bookModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async deleteBook(id: string): Promise<Book> {
    try {
      return await this.bookModel.findByIdAndDelete(id).exec();
    } catch (e) {
      console.log(e);
    }
  }
}
