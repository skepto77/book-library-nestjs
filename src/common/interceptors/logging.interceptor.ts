import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('New request!');
    const now = Date.now();
    return next.handle().pipe(
      // tap(() => {
      //   console.log(`\nExecution time: ${Date.now() - now}ms`);
      //   console.log('\nRequest was successful!');
      // }),
      map((res) => {
        return { status: 'success', data: res };
      }),
      catchError((err) => {
        // console.log(`\nExecution time: ${Date.now() - now}ms`);
        // console.log('\nRequest was failed!');
        // console.log('\nError message: ', err);
        return throwError({ status: 'fail', data: err });
      }),
    );
  }
}
