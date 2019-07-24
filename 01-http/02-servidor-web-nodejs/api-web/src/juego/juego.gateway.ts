import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Client} from 'socket.io';

// ws://localhost:3001/websockets
@WebSocketGateway(3011,
    {
        namespace: '/websocketsjuego'
    })
export class JuegoGateway {

    @WebSocketServer() server;

    constructor() {
        console.log(this.server);
    }

    //SERVIDOR

    @SubscribeMessage('holaMundo')
    holaMundo(client: Client | any, data: any) {
        console.log(data);
        console.log('Nos hacen la peticion');
        //console.log("server: ",this.server);

        client.broadcast.emit('saludaron', data);// broadcast a todos los sockets del servidor
        return 'Hola: ' + data.nombre;
    }
}