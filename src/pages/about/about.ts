import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {DisplayPage} from '../display/display';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController , public navParams:NavParams) {

  }
  more(i,a){
    this.navCtrl.push(DisplayPage, {Room:i,type:a})
  }

}
