// Learnt from: https://www.youtube.com/watch?v=3qmOFLBhfD8

import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  name: any;
  msgVal: string = '';

  constructor(public af: AngularFire) {
    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 5
      }
    });
    this.af.auth.subscriber(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup // .Redirect
    })
  }

  chatSend(theirMessage: string) {
    //Retrieving from the app.component.html file
    this.items.push({ message: theirMessage, name: this.name.facebook.displayName});
    this.msgVal = '';
  }
}


