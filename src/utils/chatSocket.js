import END_POINT from 'apis/END_POINT';

class ChatSocket {
  constructor(webSocket, roomId, userId, onMessage) {
    this.webSocket = webSocket;
    this.roomId = roomId;
    this.userId = userId;
    this.webSocket.onopen = this.onOpen;
    this.webSocket.onclose = this.onClose;
    this.webSocket.onmessage = onMessage;
  }

  onOpen() {
    this.webSocket.send(
      JSON.stringify({
        room_id: this.roomId,
        writer: this.userId,
        messageType: 'enter',
      }),
    );
    console.log('WebSocket is Opened');
  }

  onClose() {
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
