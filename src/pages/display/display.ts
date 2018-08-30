import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
import moment from 'moment';
import {FirebaseProvider}  from '../../providers/firebase/firebase';
import {booking} from '../../models/booking'
import { error } from '@firebase/database/dist/esm/src/core/util/util';
import {HomePage} from '../home/home';

/**
 * Generated class for the DisplayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display',
  templateUrl: 'display.html',
})
export class DisplayPage {

pictures = ["test", "bed2", "rm1", "hot1"] 
room = this.navParams.get('Room');
roomType = ["DELUXE SUITE","ASCOT SUITE","SUPERIOR SUITE","PALM TWIN SUITE"];
roomPrice = [1200,1400,1550,1500];
roomDetails = ["A spacious and cosy room with an adjoining bathroom, outside balcony, (except room 4 and 9) desk, flatscreen TV, tea / coffee facilities, air- conditioning and complimentary WiFi. Bathrobe and slippers supplied. Rooms 1 and 5 have baths only.These rooms do NOT come with a small bar fridge.The Ascot Boutique Hotel Policy states that all bookings not cancelled within 48 hours of arrival will be charged at one nights room rate according to the accommodation booked.These terms will not be waivered.", "A spacious guest room equipped with a mini-bar facility, bar fridge, an adjoining bathroom, outside balcony, desk, flatscreen TV, tea / coffee facilities, air-conditioning and complimentary WiFi. Bathrobe and slippers supplied.The Ascot Boutique Hotel Policy states that all bookings not cancelled within 48 hours of arrival will be charged at one nights room rate according to the accommodation booked.These terms will not be waivered.", "A spacious and guest room with an adjoining lounge and TV area with a pull out couch that sleeps an extra 2 guests and is equipped with a mini- bar facility, bar fridge, an adjoining bathroom, outside balconies, desks, flatscreen TVs, tea / coffee facilities, air-conditioning and complimentary WiFi.The Ascot Boutique Hotel Policy states that all bookings not cancelled within 48 hours of arrival will be charged at one nights room rate according to the accommodation booked.These terms will not be waivered.","he Studios are open-plan rooms comprising a comfortable bedroom with writing desk and a luxurious en-suite bathroom. The bedroom can be prepared in your choice of either a King-size bed or two Single beds.All the rooms are equipped with extra-length Simmons pocket-coil mattresses, complete with Down Feather duvets and 100% Cotton percale linen to ensure a wonderful night’s sleep. A baby cot can also be provided if required"]

roomtyrpe;
price;
details;
hideMe = false;
style;
pic1;
pic2;
pic3;
type = this.navParams.get('type');

inDate;
outDate;
Quantity;
totalPrice;
qun;
today;


TodayDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private fire: FirebaseProvider,private toastCtrl: ToastController) {

    this.roomtyrpe =  this.roomType[this.room];
    this.price = this.roomPrice[this.room];
    this.totalPrice = this.price;
    this.details = this.roomDetails[this.room];
    this.pic1 = "../../assets/imgs/" + this.pictures[this.room] + "1.jpg";
    this.pic2 = "../../assets/imgs/" + this.pictures[this.room] + "2.jpg";
    this.pic3 = "../../assets/imgs/" + this.pictures[this.room] + "3.jpg";
    var currentDate = new Date()
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var today =  year + "-"+ '0' + month + "-" +  day; 
    this.today =  today;
    this.TodayDate = this.today;
  }


  hide() {
    if (this.hideMe == false){
      this.style = "animated fadeInDown"
      this.hideMe = true;
    }
    else{
      this.style = "animated bounceOutLeft"
      this.hideMe = false;
    }
  }

date(){
  var start = moment(this.inDate, "YYYY-MM-DD");
  var end = moment(this.outDate, "YYYY-MM-DD");
  var days = moment.duration(end.diff(start)).asDays();
  this.totalPrice =  (this.price * days);

}


test(){


if (this.inDate > this.outDate){
  const alert = this.alertCtrl.create({
    title: 'Check-Out Date Invalid',
    subTitle: 'The check-out date cannot be before the check-in date',
    buttons: ['OK']
  });
  alert.present();
}

else if (this.inDate < this.today)
{
  const alert = this.alertCtrl.create({
    title: 'Check-In Date Invalid',
    subTitle: 'The check-in date cannot be before today!',
    buttons: ['OK']
  });
  alert.present();
}
else if(this.inDate =="" || this.inDate == undefined){
  const alert = this.alertCtrl.create({
    title: 'Check-In Date Invalid',
    subTitle: 'Please select a check-in date before making a booking!',
    buttons: ['OK']
  });
  alert.present();
}
else if (this.outDate =="" || this.outDate == undefined){
  const alert = this.alertCtrl.create({
    title: 'Check-Out Date Invalid',
    subTitle: 'Please select a check-out date before making a booking!',
    buttons: ['OK']
  });
  alert.present();
}
else if (this.inDate == this.outDate){
  const alert = this.alertCtrl.create({
    title: 'Dates Invalid',
    subTitle: 'The check-in and check-out date connot be the same!',
    buttons: ['OK']
  });
  alert.present();
}
else{
  this.bookRoom();
}

}

bookRoom(){
  this.date();
  let alert = this.alertCtrl.create({
    title: 'Confirm Booking',
    message: 'Are You Sure You Want To Place This Booking? TOTAL R' + this.totalPrice,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {

        }
      },
      {
        text: 'OK',
        handler: () => {

     
          this.fire.createBooking(this.totalPrice,this.pic1,this.type,this.roomtyrpe,this.inDate,this.outDate,this.today);
          const toast = this.toastCtrl.create({
            message: 'Your Booking Has Been Successfully Placed',
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'
          });
          this.navCtrl.push(HomePage);
          toast.present();
        
        }
      }
    ]
  });
  alert.present();
}

}
