import { Component } from '@angular/core';
// import { FirebaseauthService } from '../firebaseauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = '';
  password: string = '';
  agencyInput: string = ''; // Input field for agency

  // constructor(private authService: FirebaseauthService, private router: Router) { }

  // async register() {
  //   try {

  //     const userCredential = await this.authService.register(this.email, this.password);
  //     if(userCredential.user){
  //       const usertag = this.getusetag(this.email)
  //       this.router.navigate(['/homepage']);
  //     }else{
  //       console.error('Registration failed: No user returned');
  //     }
      
  //   } catch (error) {
  //     console.error('Registration failed', error);
  //   }
  // }

  // getusetag(email: string){
  //   const index = email.indexOf('@');
  //   const tag = email.substring(0,index) 
  //   return tag;
  // }

}
