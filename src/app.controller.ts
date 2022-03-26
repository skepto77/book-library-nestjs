import { Controller, Get, Redirect, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('http://localhost:3000/api/books/view', 301)
  getDocs() {
    console.log('hello');
  }
  // redirect(@Res() res) {
  //   return res.redirect('api/books/view');
  // }
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
