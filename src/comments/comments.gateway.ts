import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
// import { Server } from 'ws';
import { Socket, Server } from 'socket.io';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { CommentsService } from './comments.service';

@WebSocketGateway()
export class CommentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly commentsService: CommentsService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('Socket Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('toServerAddComment')
  async addComment(
    client: Socket,
    @MessageBody() dto: CommentDto,
  ): Promise<Comment | void> {
    // console.log('toServerAddComment payload', dto);
    const { comment, bookId } = dto;
    try {
      await this.commentsService.createComment({
        comment,
        bookId,
      });
    } catch (e) {
      console.log(e);
    }

    console.log(comment);
    this.server.emit('toClient', `message: ${comment}`);
  }

  @SubscribeMessage('toServerGetAllComments')
  async getAllComments(client: Socket, payload): Promise<void> {
    // console.log('toServerGetAllComments payload', payload);
    try {
      const comments = await this.commentsService.findAllBookComment(
        payload.id,
      );
      const result = comments.map((item) => `message: ${item.comment}`);
      this.server.emit('toClient', result);
    } catch (e) {
      console.log(e);
    }
  }
}
