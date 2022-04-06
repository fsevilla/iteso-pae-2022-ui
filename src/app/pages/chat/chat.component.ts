import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message: string = '';
  messages: any[] = [];
  socketClient: any = null;

  constructor() { }

  ngOnInit(): void {
    this.socketClient = socketIo.io(environment.socketUrl, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': 'b413a60deaee2999888ba10be872b99fb2e5812a08255e0d98d6656d894341de6684ba30d09bf35d40cfae8d4aa27719'
          }
        }
      }
    });

    this.socketClient.on('newMessage', (data:any) => {
      console.log('Llego un mensaje', data);
      this.messages.push(data);
    });
  }

  send() {
    console.log('Enviar mensaje')
    this.messages.push({
      message: this.message,
      owned: true
    });
    this.socketClient.emit('newMessage', {
      message: this.message
    });
    this.message = '';
  }

}
