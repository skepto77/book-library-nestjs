import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(dto: BookDto): Promise<Book> {
    try {
      const createdBook = new this.bookModel(dto);
      return createdBook.save();
    } catch (e) {
      console.log(e);
    }
  }

  async getBook(id: string): Promise<Book> {
    try {
      return await this.bookModel.findById(id).select('-__v');
    } catch (e) {
      console.log(e);
    }
  }

  async getBooks(): Promise<Array<Book>> {
    try {
      return await this.bookModel.find().select('-__v').exec();
    } catch (e) {
      console.log(e);
    }
  }

  async updateBook(id: string, dto: BookDto): Promise<Book | string> {
    try {
      console.log(id, dto);
      return await this.bookModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();
    } catch (e) {
      console.error(e);
      return `Ошибка обновления книги`;
    }
  }

  async deleteBook(id: string): Promise<Book> {
    try {
      return await this.bookModel.findByIdAndDelete(id).exec();
    } catch (e) {
      console.log(e);
    }
  }
}
