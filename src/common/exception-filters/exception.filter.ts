import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response.status(status).json({
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: exception.message,
      code: status,
    });
  }
}
