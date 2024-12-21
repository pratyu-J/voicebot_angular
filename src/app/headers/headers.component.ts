import { Component } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { Router } from '@angular/router';
import { FirebaseauthService } from '../firebaseauth.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {

  constructor(private sharedservice: SharedServiceService, private user: FirebaseauthService, private router: Router){

  }

  userid = this.sharedservice.get_uid()

  onclickhome(){
    console.log("not functional")
  }

  gotoAccounts(){

  }

  logout(){
    // this.user.logout();
    // // this.user.isLoggedIn = false;
    this.router.navigate(['./login']);

  }

  menuItemClicked(option: string) {
    console.log('Clicked:', option);
    // Add your logic here...
  }

}
