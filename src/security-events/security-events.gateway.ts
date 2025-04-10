import { Logger } from '@nestjs/common'
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CreateSecurityEventDto } from './dto/create-security-event.dto'

// The WebSocketGateway decorator marks this class as a WebSocket server
@WebSocketGateway({
  cors: {
    origin: '*', // Allow connections from any origin (this is useful for development, but should be more restrictive in production)
  },
})
export class SecurityEventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  // @WebSocketServer decorator injects the WebSocket server instance into this class
  @WebSocketServer() server: Server

  //  used to log messages for debugging and monitoring
  private logger = new Logger('SecurityEventsGateway')

  // This method is called after the gateway is initialized
  afterInit() {
    this.logger.log('WebSocket Gateway initialized') // Log that the WebSocket gateway has been initialized
  }

  // This method handles a new client connection
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`) // Log when a client successfully connects, including the client’s unique ID
  }

  // This method handles a client disconnecting
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`) // Log when a client disconnects, including the client’s unique ID
  }

  // This method emits a security event to all connected clients
  emitSecurityEvent(securityEvent: CreateSecurityEventDto) {
    this.server.emit('securityEvent', securityEvent) // Emit the event to all clients
    this.logger.log(`Security event emitted: ${securityEvent.event_type}`) // Log the security event that was emitted
  }
}
