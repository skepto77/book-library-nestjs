import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Books Controller', () => {
  let app: INestApplication;

  const bookId = '61e078bba8a38af4c9f08939';
  // let bookId;

  const mockBook = {
    title: 'Test title #1',
    description: 'description #1',
    authors: 'Test authors #1',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('api/books (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/books')
      .expect(HttpStatus.OK)
      .then(({ body }: request.Response) => {
        expect(body).toEqual(expect.any(Array));
      });
  });

  // it('/api/books/ (POST)', async () => {
  //   return request(app.getHttpServer())
  //     .post('/api/books')
  //     .send(mockBook)
  //     .expect(201)
  //     .then(({ body }: request.Response) => {
  //       bookId = body.data._id;
  //       expect(bookId).toBeDefined();
  //     });
  // });

  it('/api/books/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/books/' + bookId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.data._id).toBe(bookId);
      });
  });

  // it('/api/books/:id (DELETE)', () => {
  //   return request(app.getHttpServer())
  //     .delete('/api/books/' + bookId)
  //     .expect(200);
  // });

  afterAll(async () => {
    await app.close();
  });
});
