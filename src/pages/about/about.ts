import { Component } from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import { AlertController } from 'ionic-angular';
//import {Page} from '@ionic-angular';
import {DetailPage} from '../detail/detail';
import {ContactPage} from "../contact/contact";
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
	detailPage = DetailPage;
	public userDetails : any;
public resposeData : any;
public resposeData_detail : any;
public message_alert: any;	
public notice_alert: any;
public posttype: any;
userPostData = {
    "user_id": "",
    "token": "",
	"job_id": "",
	"reason": ""
   
  };

shownGroup = null;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public alertCtrl: AlertController) {
	    var temp = this;
		setInterval(function(){ 
		//alert('count '+(i++));
		const data = JSON.parse(localStorage.getItem('userData'));
		temp.userDetails = data.userData;
		temp.userPostData.user_id = temp.userDetails.user_id;
		temp.userPostData.token = temp.userDetails.token;

		temp.authService.postData(temp.userPostData, "bought").then((result) =>{
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
	public getposts(){
		 const data = JSON.parse(localStorage.getItem('userData'));
		this.userDetails = data.userData;
		this.userPostData.user_id = this.userDetails.user_id;
		this.userPostData.token = this.userDetails.token;
		this.authService.postData(this.userPostData, "bought").then((result) =>{
			this.resposeData = result;
			console.log(this.resposeData);
			if(this.resposeData.userData){
			 //localStorage.setItem('userData', JSON.stringify(this.resposeData));
			
			}

			}, (err) => {
			//Connection failed message
			});
	}
	seedetail2(id) {
		this.navCtrl.push(DetailPage, {id: id});
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
	
	presentAlert(notice) {
	  const alert = this.alertCtrl.create({
		title: 'Xác nhận',
		subTitle: notice,
		buttons: ['Đóng']
	  });
	  alert.present();
	}
	
	presentConfirm(id) {
	
		
		
		const alert = this.alertCtrl.create({
		title: 'Xác nhận hành động',
		message: 'Bạn đã đón được khách?',
		buttons: [
		  {
			text: 'Chưa',
			role: 'cancel',
			handler: () => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Đã đón',
			handler: () => {
					
			this.userPostData.user_id = this.userDetails.user_id;
			this.userPostData.token = this.userDetails.token;	
			this.userPostData.job_id = id;
			 
					this.authService.postData(this.userPostData, "taken_client").then((result) =>{
					this.resposeData_detail = result;
					console.log(result);
					this.presentAlert(this.resposeData_detail.res_message);
					this
						  .navCtrl
						  .push(ContactPage);
					}, (err) => {
					//Connection failed message
					});
			 
			}
		  }
		]
	  });
	  alert.present();
	}
	presentPrompt(id) {
	  const alert = this.alertCtrl.create({
		title: 'Hủy chuyến',
		inputs: [
		  {
			name: 'reason',
			placeholder: 'Lý do hủy chuyến:'
		  }
		],
		buttons: [
		  {
			text: 'Quay lại',
			role: 'cancel',
			handler: data => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Hủy chuyến',
			handler: data => {
				this.userPostData.user_id = this.userDetails.user_id;
				this.userPostData.token = this.userDetails.token;	
				this.userPostData.job_id = id;
				this.userPostData.reason = data.reason;
				this.authService.postData(this.userPostData, "cancel").then((result) =>{
					
					this.resposeData_detail = result;
					console.log(result);
					this.presentAlert(this.resposeData_detail.message)
					}, (err) => {
					//Connection failed message
					});
			}
		  }
		]
	  });
	  alert.present();
	}
}
