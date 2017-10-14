import { Component, ViewChild } from '@angular/core';
import { Nav,Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplitPane } from '../providers/split-pane';
import { Welcome } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { AboutPage} from '../pages/about/about';
import { ContactPage} from '../pages/contact/contact';
import { TransactionPage} from '../pages/transaction/transaction';
import { AccountPage} from '../pages/account/account';
import { FinancePage} from '../pages/finance/finance';
import { NewsPage} from '../pages/news/news';
//import { SellingPage} from '../pages/selling/selling';

//import { Push, PushObject, PushOptions } from '@ionic-native/push';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
 @ViewChild(Nav) nav: Nav;

rootPage:any = Welcome;
   userDetails = {
    "name": "",
    "balance": ""
   
  };

  pages: Array<{title: string, component: any}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, public splitPane: SplitPane, public menu: MenuController) {
	 
	  if (localStorage.getItem('userData')) {
		   const data = JSON.parse(localStorage.getItem('userData'));
			this.userDetails = data.userData;
	  }
	  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
	this.pages = [
	{ title: 'Chuyến xe', component: HomePage },
	{ title: 'Đã mua', component: AboutPage },
	{ title: 'Đã hoàn thành', component: ContactPage },
      { title: 'Giao dịch', component: TransactionPage },
	  { title: 'Thông báo', component: NewsPage },
	  { title: 'Nạp tiền', component: FinancePage },
	  //{ title: 'Bán chuyến', component: SellingPage },
	  { title: 'Cài đặt', component: AccountPage }
	  
      
    ];
  }
  
 openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
   backToWelcome(){
   const root = this.app.getRootNav();
    root.popToRoot();
  }

  logout(){
    //Api Token Logout 
    console.log("log out roi nhe");
    localStorage.clear();
    this.menu.enable(false);
     setTimeout(()=> this.backToWelcome(), 1000);
    
  }

}
