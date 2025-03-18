// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { io, Socket } from 'socket.io-client';

// @Injectable({
//   providedIn: 'root',
// })
// export class SocketService {
//   private socket: Socket;

//   constructor() {
//     this.socket = io('http://localhost:5000'); 
//   }

//   // Host creates a room
//   createRoom(hostName: string) {
//     this.socket.emit('createRoom', hostName);
//   }

//   // Player joins a room
//   joinRoom(roomCode: string, playerName: string) {
//     this.socket.emit('joinRoom', roomCode, playerName);
//   }

//   // Player submits their score
//   submitScore(roomCode: string, playerName: string, score: number) {
//     this.socket.emit('submitScore', roomCode, playerName, score);
//   }

//   // Host ends the quiz
//   endQuiz(roomCode: string) {
//     this.socket.emit('endQuiz', roomCode);
//   }

//   // Listen for events
//   onRoomCreated(callback: (roomCode: string) => void) {
//     this.socket.on('roomCreated', callback);
//   }

//   onPlayerJoined(callback: (playerName: string) => void) {
//     this.socket.on('playerJoined', callback);
//   }

//   onScoreUpdated(callback: (scores: { [playerName: string]: number }) => void) {
//     this.socket.on('scoreUpdated', callback);
//   }

//   onQuizEnded(callback: (scores: { [playerName: string]: number }) => void) {
//     this.socket.on('quizEnded', callback);
//   }

  
//   // Emit events to the server
//   emit(event: string, data?: any) {
//     this.socket.emit(event, data);
//   }

//   // Listen for events from the server
//   on(event: string): Observable<any> {
//     return new Observable((observer) => {
//       this.socket.on(event, (data) => observer.next(data));
//     });
//   }

//   // Disconnect the socket
//   disconnect() {
//     this.socket.disconnect();
//   }
// }



// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000'); // Connect to your backend
  }

  //   // Host creates a room
  createRoom(hostName: string) {
    this.socket.emit('createRoom', hostName);
  }

  // Emit events to the server
  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  // Listen for events from the server
  on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => observer.next(data));
    });
  }

  // Disconnect the socket
  disconnect() {
    this.socket.disconnect();
  }
}