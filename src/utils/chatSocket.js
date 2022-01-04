import END_POINT from 'apis/END_POINT';

export default class ChatSocket {
  constructor(roomId, userId, onMessage) {
    this.webSocket = new WebSocket('wss://minzzu.shop:443/bobs/chat');
    this.roomId = roomId;
    this.userId = userId;
    console.log('...', this.webSocket);
    this.webSocket.onopen = this._handleOpen.bind(this);
    this.webSocket.onclose = this._handleClose.bind(this);
    this.webSocket.onmessage = onMessage;
  }

  _handleOpen() {
    this.webSocket.send(
      JSON.stringify({
        room_id: this.roomId,
        writer: this.userId,
        messageType: 'enter',
      }),
    );
    console.log('WebSocket is Opened');
  }

  _handleClose() {
    this.webSocket.send(
      JSON.stringify({
        room_id: this.roomId,
        writer: this.userId,
        messageType: 'leave',
      }),
    );
    this.webSocket.close();
    console.log('WebSocket is Disconnected');
  }

  close() {
    this.webSocket.close();
  }

  send(message) {
    this.webSocket.send(
      JSON.stringify({
        room_id: this.roomId,
        messageType: 'text',
        writer: this.userId,
        message: message,
      }),
    );
    console.log('message is send');
  }
}
