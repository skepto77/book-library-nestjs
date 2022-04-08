import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  const mockBook = {
    title: 'Test title #1',
    description: 'description #1',
    authors: 'Test authors #1',
  };

  const booksArray = [
    {
      _id: '1',
      title: 'Test title #1',
      description: 'description #1',
      authors: 'Test authors #1',
    },
    {
      _id: '2',
      title: 'string',
      description: 'string',
      authors: 'string',
    },
  ];

  const bookRepository = {
    exec: jest.fn(),
    new: jest.fn().mockResolvedValue(mockBook),
    // create: jest.fn().mockImplementation((dto) => dto),
    create: jest.fn(),
    save: jest
      .fn()
      .mockImplementation((book) => Promise.resolve({ _id: '1', ...book })),
    find: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: bookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('create book2', async () => {
  //   expect(
  //     await service.createBook({
  //       title: 'test title',
  //       description: 'description #1',
  //     }),
  //   ).toEqual({
  //     title: 'test title',
  //     description: 'description #1',
  //   });
  // });

  it('create book', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'Test title #1',
        description: 'description #1',
        authors: 'Test authors #1',
      }),
    );
    const newBook = await service.createBook({
      title: 'Test title #1',
      description: 'description #1',
      authors: 'Test authors #1',
    });
    expect(newBook).toEqual(mockBook);
  });

  it('get books', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(booksArray),
    } as any);
    const books = await service.getBooks();
    expect(books).toEqual(booksArray);
  });

  it('get book by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(booksArray[0]),
    } as any);
    const book = await service.getBook('1');
    expect(book).toEqual(booksArray[0]);
  });
});
