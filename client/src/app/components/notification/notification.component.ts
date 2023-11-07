import { Component, OnInit, OnDestroy } from '@angular/core';
//import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications = [
    { id: 1, message: '🥷 Mihai, comment on your post', isNew: true },
    { id: 2, message: 'Jurah liked your post ❤️', isNew: false },
    // ... other notifications
  ];
  private notificationsSubscription: Subscription | undefined;

  constructor(/*private webSocketService: WebSocketService*/) {}

  ngOnInit(): void {
    // THIS IS A TEST TO IMPLEMENT THE NOTIFICATION, TROUGH SOCKET.IO
    /*
     this.notificationsSubscription = this.webSocketService.notifications$.subscribe((notification: any) => {
      // Log the received notification for debugging
      console.log('Notification received:', notification);

      // Map the notification to the expected format if necessary
      //this is what I am sending from the server
      //       socket.emit('notification', { id: Date.now(), message: msg, isNew: true });
      const formattedNotification = {
        id: notification[1].id,
        message: notification[1].message,
        isNew: notification[1].isNew
      }

      console.log('Formatted notification:', formattedNotification);
      console.log('existing notifications:', this.notifications);

      // Add the formatted notification to the array
      this.notifications.push(formattedNotification);
      console.log('updated notifications:', this.notifications);
    });

    this.webSocketService.acknowledge$.subscribe((ack) => {
      if(ack) {
        console.log('Server acknowledged:', ack);
        // Here you can implement logic that should happen after acknowledgement
      }
    });

     */
  }


  markAsRead(notificationId: number): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isNew = false;
      // Just call the service method to emit the 'markAsRead' event
     // this.webSocketService.markAsRead(notificationId);
    }
  }

  get numberOfNotifications(): number {
    return this.notifications.filter(notification => notification.isNew).length;
  }

  ngOnDestroy(): void {
    // this.notificationsSubscription?.unsubscribe();
    // this.webSocketService.disconnect();
  }
}
