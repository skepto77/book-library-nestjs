import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus() || 500;

    host.switchToHttp().getResponse().status(status).json({
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: exception.message,
      code: status,
    });

    // .render('../../views/pages/error.ejs', {
    //   title: status,
    //   message: exception.message,
    // });
  }
}
