import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findAllBookComment(id: string): Promise<Array<Comment>> {
    try {
      return await this.commentModel.find({ bookId: id }).exec();
    } catch (e) {
      console.log(e);
    }
  }

  async createComment(dto: CommentDto): Promise<Comment> {
    try {
      return await this.commentModel.create(dto);
    } catch (e) {
      console.log(e);
    }
  }

  async updateComment(id: string, dto: CommentDto): Promise<Comment> {
    try {
      return await this.commentModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteComment(id: string): Promise<Comment> {
    try {
      return await this.commentModel.findByIdAndDelete(id).exec();
    } catch (e) {
      console.log(e);
    }
  }
}
