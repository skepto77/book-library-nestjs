import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Render,
  Delete,
  Redirect,
  Req,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { Book } from './schemas/book.schema';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // add book/books

  @Post()
  async create(@Body() dto: BookDto): Promise<Book> {
    return this.booksService.createBook(dto);
  }

  @Get()
  async getBooks(): Promise<Book[]> {
    try {
      return await this.booksService.getBooks();
    } catch (e) {
      console.log(e);
    }
  }

  @Get('view')
  @Render('index')
  async viewBooks() {
    try {
      const books = await this.booksService.getBooks();
      return { title: 'Книги', books: books };
    } catch (e) {
      console.log(e);
    }
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Book> {
    try {
      return await this.booksService.getBook(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('view/:id')
  @Render('details')
  async viewBook(@Param('id') id: string) {
    try {
      const data = await this.booksService.getBook(id);
      return { title: data.title, book: data, count: 0 };
    } catch (e) {
      console.log(e);
    }
  }

  // update book

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: BookDto) {
    try {
      return await this.booksService.updateBook(id, dto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/edit/:id')
  @Render('editBook')
  async editBook(@Param('id') id: string) {
    try {
      const data = await this.booksService.getBook(id);
      return { title: data.title, book: data };
    } catch (e) {
      console.log(e);
    }
  }

  @Post('/edit/:id')
  @Redirect('/api/books/view', 301)
  async updateBook(@Param('id') id: string, @Body() dto: BookDto) {
    try {
      return await this.booksService.updateBook(id, dto);
    } catch (e) {
      console.log(e);
    }
  }

  // delete book

  @Get(':id/delete')
  @Delete(':id')
  @Redirect('/api/books/view', 301)
  async delete(@Param('id') id: string): Promise<Book> {
    try {
      return await this.booksService.deleteBook(id);
    } catch (e) {
      console.log(e);
    }
  }
}
