import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(dto: BookDto): Promise<Book> {
    const book = new this.bookModel(dto);
    Object.assign(book, dto);
    return this.bookModel.create(book);
  }

  async getBook(id: string): Promise<Book> {
    return await this.bookModel.findById(id).select('-__v').exec();
  }

  async getBooks(): Promise<Array<Book>> {
    return await this.bookModel.find().select('-__v').exec();
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
