import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController} from 'ionic-angular';
import {FirebaseProvider}  from '../../providers/firebase/firebase';
import { Observable } from 'rxjs';
/**
 * Generated class for the BookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book',
  templateUrl: 'book.html',
})
export class BookPage {
  items: Observable<any[]>
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fire: FirebaseProvider) {
  }

  ionViewDidLoad() {
  this.fire.getBookings().then(data =>{
  this.items =  data;
    });

  }
  selectItem(key){
    const confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you agree to Cancel This Booking?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {

          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.fire.deleteBooking(key);
          }
        }
      ]
    });
    confirm.present();

  }

}
