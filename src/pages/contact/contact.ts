import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
hideMe = false;
  constructor(public navCtrl: NavController) {

  }
  hide() {
    if (this.hideMe == false){

      this.hideMe = true;
    }
    else{
      this.hideMe = false;
    }
  }
}
