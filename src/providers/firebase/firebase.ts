
import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { error } from '@firebase/database/dist/esm/src/core/util/util';
import { AuthTokenProvider } from '@firebase/database/dist/esm/src/core/AuthTokenProvider';



/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  userRef: AngularFireList<any>;
  Bookings: Observable<any[]>
  results;
  dbPath;
  test;
  userId;
  state;
  constructor(private authen : AngularFireAuth, private db: AngularFireDatabase) {

  }

  login(email, passw){

    return new Promise ((accpt, rej)=>{
      this.results = this.authen.auth.signInWithEmailAndPassword(email,passw).then(()=>{
         this.results = this.authen.authState.subscribe(data =>{
          this.userId =  data.uid;
          accpt(data)
          })}, 
          error => 
          {
           rej(error.message)
          })
    })
  }

  register (email, passw, name, Surname, Id, phone, address){
    return new Promise ((accpt, rej)=>{
      this.authen.auth.createUserWithEmailAndPassword(email,passw).then(() =>{
        this.authen.authState.subscribe(data =>{
          this.userId =  data.uid;
          this.dbPath =  'users/' + data.uid + '/' + 'Personal_details' ; 
          this.userRef = this.db.list(this.dbPath);
          this.userRef.push({
            name: name,
            surname: Surname,
            idNo: Id,
            phoneNo: phone,
            Address: address});   
            accpt(data)
          })},
          error => 
          {
           rej(error.message)
          })
    })
 
  }

  createBooking(prc, pic, type, name, ind, outd, dt){

      return new Promise ((accpt, rej) =>{
        this.authen.authState.subscribe(data =>{
          this.userId =  data.uid;
        this.dbPath =  'Bookings/' + this.userId ; 
        this.userRef = this.db.list(this.dbPath);
        this.userRef.push({
          picture: pic,
          price: prc,
          RoomName: name,
          RoomType: type,
          inDate: ind,
          outDate: outd,
          dateMade : dt
        }); 
        return (accpt)  
      })
      })
  }

  updateBoooking(){

  }

  deleteBooking(key){
    this.authen.authState.subscribe(data =>{
      this.userId =  data.uid;
    this.dbPath =  'Bookings/' + this.userId; 
    this.userRef = this.db.list(this.dbPath);
    this.userRef.remove(key)})
  }
  getuserID():any{
    var x;
   return x = this.authen.authState.subscribe(data =>{
 this.userId =  data.uid;
    });
  }
getBookings():any{
return new Promise ((accpt, rej) =>{ 
 this.authen.authState.subscribe(data =>{
    this.userId =  data.uid;
    this.dbPath =  'Bookings/' + this.userId; 
    this.userRef = this.db.list(this.dbPath);
    this.Bookings = this.userRef.snapshotChanges().pipe(
    map(changes => 
    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
     accpt (this.Bookings);
   });
})
}

getAuthState(){
  return new Promise ((accpt, rej) =>{ 
    this.authen.auth.onAuthStateChanged(user =>{
      if (user){
        this.state = 1;
      }
      else{
        this.state = 0;
      }
      accpt(this.state);
     });
  })
}


logout(){
  this.authen.auth.signOut();
}

}
