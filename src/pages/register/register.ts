import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {User} from '../../models/user';
import {FirebaseProvider}  from '../../providers/firebase/firebase';
import {HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  userReg = {} as User;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, private fire: FirebaseProvider, public alertCtrl: AlertController) {
  }

  register(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
    
    this.fire.register(this.userReg.email, this.userReg.password, this.userReg.name,this.userReg.surname, this.userReg.id,this.userReg.phone, this.userReg.address).then((data:any)=>{
      const alert = this.alertCtrl.create({
        title: 'SignIn Successfull',
        subTitle: 'Welcome '+ data.email,
        buttons: ['OK']
      });
      this.navCtrl.push(HomePage);
      alert.present();
    },(error) =>{
      const alert = this.alertCtrl.create({
        title: 'SignUp Unsuccessfull',
        subTitle: error,
        buttons: ['OK']
      });
      alert.present();
    })
  }
  SignUp(){
    this.navCtrl.pop();
  }
}
