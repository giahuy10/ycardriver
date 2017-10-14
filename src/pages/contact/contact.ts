import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	public userDetails : any;
public resposeData : any;	
userPostData = {
    "user_id": "",
    "token": ""
   
  };
  shownGroup = null;

  constructor(public navCtrl: NavController, public authService: AuthService) {
	 var temp = this;
		setInterval(function(){ 
		//alert('count '+(i++));
		const data = JSON.parse(localStorage.getItem('userData'));
		temp.userDetails = data.userData;
		temp.userPostData.user_id = temp.userDetails.user_id;
		temp.userPostData.token = temp.userDetails.token;

		temp.authService.postData(temp.userPostData, "completed").then((result) =>{
				temp.resposeData = result;
				//console.log(temp.resposeData);
				if(temp.resposeData.userData){
				 //localStorage.setItem('userData', JSON.stringify(temp.resposeData));
				
			  }

			}, (err) => {
		  //Connection failed message
		});
        
    }, 300);
}
toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
};
isGroupShown(group) {
    return this.shownGroup === group;
};
}