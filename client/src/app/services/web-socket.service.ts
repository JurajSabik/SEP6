import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {io, Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket | undefined;
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private acknowledgeSubject = new BehaviorSubject<any>(null);
  public acknowledge$ = this.acknowledgeSubject.asObservable();

  constructor() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000');

    this.socket.on('notification', (notification: any) => {
      const currentNotifications = this.notificationsSubject.value;
      this.notificationsSubject.next([...currentNotifications, notification]);
    });

    // Subscribe to 'acknowledge' events from the server
    this.socket.on('acknowledge', (data) => {
      console.log('Acknowledgement from server:', data);
      this.acknowledgeSubject.next(data);
      // You can implement additional logic here if needed
    });
  }

  markAsRead(notificationId: number) {
    // send an event to the server to mark the notification as read
    this.socket?.emit('markAsRead', notificationId);
    // Update the local notifications array as necessary

  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }


}
