import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, MessageBody, } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../messages/messages.service';

@WebSocketGateway({
    cors: {
        origin: [
            'http://localhost:3000',
            'https://community-connect-1cuie364h-kauas-projects-5d7f1c1a.vercel.app/auth/register'
        ]
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messageService: MessageService) { }

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinConversation')
    handleJoinConversation(
        @ConnectedSocket() client: Socket,
        @MessageBody() conversationId: number,
    ) {
        client.join(conversationId.toString());
        console.log(`Client ${client.id} entrou na conversa ${conversationId}`);
    }

    @SubscribeMessage('leaveConversation')
    handleLeaveConversation(
        @ConnectedSocket() client: Socket,
        @MessageBody() conversationId: number,
    ) {
        client.leave(conversationId.toString());
        console.log(`Client ${client.id} saiu da conversa ${conversationId}`);
    }

    // ----------------------
    // Enviar mensagem (paralelizado + UX instantâneo)
    // ----------------------
    @SubscribeMessage('sendMessage')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: { conversationId: number; senderId: number; content: string },
    ) {
        const { conversationId, senderId, content } = payload;

        console.log('Mensagem recebida no gateway:', payload);

        // --- (1) Envia imediatamente uma mensagem temporária ---
        const tempMessage = {
            id: null,               // cliente substitui depois
            conversationId,
            senderId,
            content,
            createdAt: new Date(),
            tempId: Date.now(),     // identificação até salvar no DB
        };

        this.server.to(conversationId.toString()).emit('message', tempMessage);

        // --- (2) Salva em background sem bloquear ---
        this.messageService.create({
            conversationId,
            senderId,
            content,
        })
            .then(savedMessage => {
                // envia update para sincronizar cliente (opcional)
                this.server
                    .to(conversationId.toString())
                    .emit('messageConfirmed', {
                        tempId: tempMessage.tempId,
                        ...savedMessage,
                    });
            })
            .catch(err => {
                console.error('Erro ao salvar a mensagem:', err);

                client.emit('errorMessage', {
                    error: 'Não foi possível salvar a mensagem',
                    tempId: tempMessage.tempId,
                });
            });

        // retorna imediatemente a temp message
        return tempMessage;
    }
}