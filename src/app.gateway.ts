import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Server, Socket } from 'socket.io';
export class Payload {
  readonly message: string;
  readonly token: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly authService: AuthService) {}

  private logger: Logger = new Logger('AppGateway');
  @WebSocketServer() wss: Server;

  afterInit(server: Server): void {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: Payload): void {
    let name = 'Anonim';
    if (payload.token !== undefined) {
      name = this.authService.getName(`Bearer ${payload.token}`);
    }
    const arg = {
      msg: payload.message,
      name: name,
    };
    this.wss.emit('msgToClient', arg);
  }
}
