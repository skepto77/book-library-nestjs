import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks() {
    try {
      return await this.booksService.getBooks();
    } catch (e) {
      console.log(e);
    }
  }

  @Post()
  async create(@Body() dto: BookDto) {
    console.log('dto', dto);
    return this.booksService.createBook(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return await this.booksService.getBook(id);
    } catch (e) {
      console.log(e);
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: BookDto) {
    try {
      return await this.booksService.updateBook(id, dto);
    } catch (e) {
      console.log(e);
    }
  }
}
