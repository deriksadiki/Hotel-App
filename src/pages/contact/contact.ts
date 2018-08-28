import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { flatten } from '@angular/compiler';
import { EmailComposer } from '@ionic-native/email-composer';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
hideMe = false;
  constructor(public navCtrl: NavController,private emailComposer: EmailComposer,public alertCtrl: AlertController) {

  }

  hide(){
    if (this.hideMe ==  false){
      this.hideMe =  true;
    }
    else{
      this.hideMe =  true;
    }
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
