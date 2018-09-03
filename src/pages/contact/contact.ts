import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';
import {FirebaseProvider}  from '../../providers/firebase/firebase';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
hideMe = false;
  constructor(public navCtrl: NavController,private emailComposer: EmailComposer,public alertCtrl: AlertController, private fire: FirebaseProvider) {

  }

  hide2(){
    const prompt = this.alertCtrl.create({
      title: 'Confirmation',
      message: "Are you sure you want to sign out?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Agree',
          handler: data => {
            this.fire.logout();
            window.location.reload();
          }
        }
      ]
    });
    prompt.present();

  }


  invite(){
    const prompt = this.alertCtrl.create({
      title: 'Invite A Friend',
      message: "Please Enter The Your friend's Email Address",
      inputs: [
        {
          name: 'title',
          placeholder: 'Email Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            let email = {
              to: data.title,
              cc: [],
              bcc: [],
              attachments: [],
              subject: 'hotel Booking App',
              body: 'Hey Buddy, Please Download This Awesome Booking App',
              isHtml: true
            };
            this.emailComposer.open(email);
          }
        }
      ]
    });
    prompt.present();

  }
}
