import { IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  bookId: string;

  @IsString()
  comment: string;
}
