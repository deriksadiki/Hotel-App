import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {FirebaseProvider}  from '../../providers/firebase/firebase';
import {login} from '../../models/login';
import {RegisterPage} from '../register/register'
import {HomePage } from '../home/home';
import { App, ViewController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

userLog = {} as login;
key;

  constructor(public viewCtrl: ViewController,public loadingCtrl: LoadingController,
    public appCtrl: App,public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseProvider, public alertCtrl: AlertController) {
  }
  pushPage() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(HomePage);
  }
  logIn(){
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();

     this.fire.login(this.userLog.email,this.userLog.password).then((data:any)=>{
      const alert = this.alertCtrl.create({
        title: 'SignIn Successfull',
        subTitle: 'Welcome Back '+ data.email,
        buttons: ['OK']
      });
      this.navCtrl.push(TabsPage, {uid:data.uid});
      alert.present();
     }, (error) =>{
      const alert = this.alertCtrl.create({
        title: 'SignIn Unsuccessfull',
        subTitle: error,
        buttons: ['OK']
      });
      alert.present();
     })

}
  SignUp(){
    this.navCtrl.push(RegisterPage);
  }

  showAlert = function ()  {
    const alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }


}
