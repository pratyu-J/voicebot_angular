import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

  private user_uid = new BehaviorSubject<any>(null);
  uid$ = this.user_uid.asObservable();

  private user_tag = new BehaviorSubject<any>(null);
  user_tag$ = this.user_tag.asObservable();

  private logged = new BehaviorSubject<any>(null);
  logged$ = this.logged.asObservable();

  private sessionid = new BehaviorSubject<any>(null);
  sessionid$ = this.sessionid.asObservable();

  private voicesession = new BehaviorSubject<any>(null);
  voicesession$ = this.sessionid.asObservable();

  private activeComponentSubject = new BehaviorSubject<string | null>(null);
  activeComponent$ = this.activeComponentSubject.asObservable();

  setActiveComponent(componentName: string | null) {
    this.activeComponentSubject.next(componentName);
  }

  getActiveComponent() {
    return this.activeComponentSubject.value;
  }
  

  set_voiceSession(vsess: any){
    this.voicesession.next(vsess)
  }

  get_voiceSession(){
    return this.voicesession.value;
  }

  set_sessionid(sesid: any){
    this.sessionid.next(sesid)
  }

  get_sessionid(){
    return this.sessionid.value;
  }

  set_uid(id: string){
    this.user_uid.next(id)
  }

  get_uid(){
    return this.user_uid.value;
  }

  set_usertag(username: string){
    this.user_tag.next(username)
  }

  get_usertag(){
    return this.user_tag.value;
  }

  loggedin(val: boolean){
    this.logged.next(val)
  }

  isLoggedIn(){
    return this.logged.value
  }
}
