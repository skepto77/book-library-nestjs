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
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { Book } from './schemas/book.schema';
import { BOOK_CREATE_ERROR, BOOK_NOT_FOUND_ERROR } from './book.constants';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // add book
  @UseInterceptors(LoggingInterceptor)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: BookDto): Promise<Book> {
    const book = this.booksService.createBook(dto);
    if (!book) {
      throw new HttpException(BOOK_CREATE_ERROR, HttpStatus.BAD_REQUEST);
    }
    return book;
  }

  // get/view book/books
  @Get()
  async getBooks(): Promise<Book[]> {
    return await this.booksService.getBooks();
  }

  @Get('view')
  @Render('index')
  async viewBooks() {
    const books = await this.booksService.getBooks();
    return { title: 'Книги', books: books };
  }

  @Get(':id')
  @UseInterceptors(LoggingInterceptor)
  async get(@Param('id', IdValidationPipe) id: string): Promise<Book> {
    const book = await this.booksService.getBook(id);
    if (!book) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return book;
  }

  @Get('view/:id')
  @Render('details')
  async viewBook(@Param('id', IdValidationPipe) id: string) {
    const book = await this.booksService.getBook(id);
    if (!book) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return { title: book.title, book, count: 0 };
  }

  // update book
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: BookDto) {
    const updatedBook = await this.booksService.updateBook(id, dto);
    if (!updatedBook) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return updatedBook;
  }

  @Get('/edit/:id')
  @Render('editBook')
  async editBook(@Param('id', IdValidationPipe) id: string) {
    const book = await this.booksService.getBook(id);
    if (!book) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return { title: book.title, book };
  }

  @Post('/edit/:id')
  @Redirect('/api/books/view', 301)
  async updateBook(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: BookDto,
  ) {
    const updatedBook = await this.booksService.updateBook(id, dto);
    if (!updatedBook) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return updatedBook;
  }

  // delete book
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string): Promise<Book> {
    const deletedBook = await this.booksService.deleteBook(id);
    if (!deletedBook) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return deletedBook;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/delete')
  @Redirect('/api/books/view', 301)
  async deleteBook(@Param('id', IdValidationPipe) id: string): Promise<Book> {
    const deletedBook = await this.booksService.deleteBook(id);
    if (!deletedBook) {
      throw new HttpException(BOOK_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return deletedBook;
  }
}
