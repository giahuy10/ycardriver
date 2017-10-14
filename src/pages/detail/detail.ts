import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {AboutPage} from "../about/about";
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
	  public resposeData :any = {};
	public userDetails : any;
	 detail: any = {};
	 id: 0;
	 userPostData = {
    "user_id": "",
    "token": "",
	"job_id": ""
	
   
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public authService: AuthService) {
	  var temp = this;
		setInterval(function(){ 
			temp.id = temp.navParams.get('id');
			temp.http.get('http://driver.ycar.vn/index.php?option=com_uber&view=json&format=json&task=detail_json&job_id='+temp.id).map(res => res.json()).subscribe(data => {
			temp.detail = data;
							//console.log(temp.detail); 
			},
			err => { 
							console.log("Oops!");
			});

		}, 10);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
	presentAlert(textmessage) {
	  const alert = this.alertCtrl.create({
		title: 'Thông báo',
		subTitle: textmessage,
		buttons: ['Đóng']
	  });
	  alert.present();
	}
	
	presentConfirm(id) {
	
		
		
		const alert = this.alertCtrl.create({
		title: 'Xác nhận hành động',
		message: 'Bạn chắc chắn muốn mua chuyến đi này?',
		buttons: [
		  {
			text: 'Không',
			role: 'cancel',
			handler: () => {
			  console.log('Cancel clicked');
			}
		  },
		  {
			text: 'Mua Ngay',
			handler: () => {
			const data = JSON.parse(localStorage.getItem('userData'));
			this.userDetails = data.userData;	
			this.userPostData.user_id = this.userDetails.user_id;
			this.userPostData.token = this.userDetails.token;	
			this.userPostData.job_id = id;
			 
					this.authService.postData(this.userPostData, "buy_job").then((result) =>{
						this.resposeData = result;
					if (this.resposeData.res_type == 1) {
						this.presentAlert(this.resposeData.res_message);
						this
						  .navCtrl
						  .push(AboutPage);
					}else {
						this.presentAlert(this.resposeData.res_message);
					}	
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
