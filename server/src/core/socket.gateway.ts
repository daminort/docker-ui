import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WsException,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

import { SocketEventsEnum } from '../common/enum/socket.enum';
import { LoggerService } from './logger.service';

@Injectable()
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  private clients: Map<string, Socket> = new Map();

  constructor(private readonly loggerService: LoggerService) {}

  async handleConnection(client: Socket): Promise<void> {
    const { id } = client;
    if (this.clients.has(id)) {
      const socket = this.clients.get(id);
      socket.disconnect(true);
      this.loggerService.socketLog(`Client disconnected before the next connection: ${id}`);
    }

    this.clients.set(id, client);

    this.loggerService.socketLog(`Client connected: ${id}`);
    return Promise.resolve();
  }

  async handleDisconnect(client: Socket): Promise<void> {
    const { id } = client;
    if (this.clients.has(id)) {
      const socket = this.clients.get(id);
      socket.disconnect(true);
    }

    this.loggerService.socketLog(`Client disconnected: ${id}`);
    return Promise.resolve();
  }

  async sendMessage(clientID: string, event: SocketEventsEnum, payload?: any): Promise<void> {
    const socket = this.clients.get(clientID);
    if (!socket) {
      const err = new WsException(`Socket client ${clientID} does not exist`);
      return Promise.reject(err);
    }

    socket.emit(event, { payload });
    return Promise.resolve();
  }

  async sendToAll(event: SocketEventsEnum, payload?: any): Promise<void> {
    this.clients.forEach(socket => {
      socket.emit(event, { payload });
    });

    return Promise.resolve();
  }
}
