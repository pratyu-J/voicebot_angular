import { Component } from '@angular/core';
import { FirebaseauthService } from '../firebaseauth.service';
import { RouterModule,   Router } from '@angular/router';
import { User } from '../user'; // Import the User interface
import { SharedServiceService} from '../shared-service.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  // agencyinput: string ='';
  agency: string[] = [];
  loggedin: boolean = false;
  
  constructor(private authService: FirebaseauthService, private router: Router, private sharedService: SharedServiceService) { }

  login(){
    const useremail = this.email;
    const userpass = this.password

    if(useremail == "testuser1@gmail.com" && userpass == "testGdrfa01"){
      this.sharedService.loggedin(true)
      this.sharedService.set_uid("test1")
      this.router.navigate(['/homepage']);
    }
    else if(useremail == "testuser2@gmail.com" && userpass == "testGdrfa02"){
      this.sharedService.loggedin(true)
      this.sharedService.set_uid("test2")
      this.router.navigate(['/homepage']);
    }
    else if(useremail == "testuser3@gmail.com" && userpass == "testGdrfa03"){
      this.sharedService.loggedin(true)
      this.sharedService.set_uid("test3")
      this.router.navigate(['/homepage']);
    }
    else if(useremail == "testuser4@gmail.com" && userpass == "testGdrfa04"){
      this.sharedService.loggedin(true)
      this.sharedService.set_uid("test4")
      this.router.navigate(['/homepage']);
    }
    else if(useremail == "anna@gmail.com" && userpass == "anna4bot"){
      this.sharedService.loggedin(true)
      this.sharedService.set_uid("annatest")
      this.router.navigate(['/homepage']);
    }else{
      console.error('Login failed: No user returned');
        alert("No such user or Credentials invalid")
    }
  }

  
  // async login() {
  //   try {

  //     const userCredential = await this.authService.login(this.email, this.password);
  //     if(userCredential.user){
        
  //       let usertag = this.getusertag(this.email)
  //       this.sharedService.set_usertag(usertag) 
  //       console.log("usertag",usertag)
  //       this.sharedService.set_uid(userCredential.user.uid)

  //       console.log("Logged in");
  //       this.sharedService.loggedin(true)
  //       this.router.navigate(['/homepage']);
  //     }
  //      else{
  //       console.error('Login failed: No user returned');
  //       alert("No such user or Credentials invalid")
  //     }
       
  //   } catch (error) {
  //     console.error('Login failed', error);
  //     alert("No such user or Credentials invalid")
  //   }
  // }

  getusertag(email: string){
    const index = email.indexOf('@');
    const tag = email.substring(0,index) 
    return tag;
  }


}
