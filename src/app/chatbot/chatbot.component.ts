import { Component,  ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'firebase/auth';
import { environment } from 'src/assets/env'
import { SharedServiceService } from '../shared-service.service';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { share } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('chatBody') private chatBody!: ElementRef;
  isChatOpen: boolean = false;
  chatMessages: { text: string, isUser: boolean }[] = [];
  userMessage: string = '';
  isExpanded: boolean = false;
  apiUrl: string = '';

  serviceType: string | null = null;
  userType: string | null = null;
  awaitingResponse: 'serviceType' | 'userType' | 'none' = 'serviceType';
  isRecording = false;
  selected: boolean = false;
  sessionid: any = null;

  // Inject HttpClient in the constructor
  constructor(private http: HttpClient, private sharedService: SharedServiceService) {
    
    // this.apiUrl = 'http://localhost:5050/api/voiced?question=';

    // this.apiUrl = 'https://gdrfabot.clires.ai/chatbot/api/questions?question=';

    this.apiUrl = 'https://gdrfabot.clires.ai/chatbot/api/voiced?question=';
    
  }

ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit(){
    this.genSessionId()
    console.log(this.sessionid)
  }

  genSessionId(){

      // Generate a random 8-digit integer
      const min = 10000000; // Minimum 8-digit number
      const max = 99999999; // Maximum 8-digit number
      this.sessionid = Math.floor(Math.random() * (max - min + 1)) + min;
      this.sharedService.set_sessionid(this.sessionid)
    
  }
  
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;

    
    // Add a welcome message when the chat is opened
    if (this.isChatOpen && this.chatMessages.length === 0) {   
        
        // const sesid = this.sharedService.get_sessionid()
        // if(sesid == null){
          if(this.sessionid == null){
          console.log("creating sess id")
          this.genSessionId()
        }
        // else{
        //   this.sessionid = sesid;
        // }

          this.chatMessages.push({ text: `Welcome! How may I help you?` , isUser: false });
          // this.chatMessages.push({ text: `Welcome! Our Chatbot can help you with Residency Visa Service.` , isUser: false });
          // this.chatMessages.push({text: `What can we help you with? \nA. Status Amendment \nB. Renew Family Residence  \nPlease type the correct option (A/B) in the chat.`, isUser: false});
          
      // this.chatMessages.push({ text: "Welcome! Our Chatbot is here to assist you", isUser: false });
    }
  }

  closeChat() {
    
    this.isChatOpen = false;
    this.serviceType = null;
    this.userType = null;
    this.chatMessages = [];
    this.sessionid = null;
    this.sharedService.set_sessionid(null);
  }

  minimizeChat() {
    this.isChatOpen = false;
  }


  scrollToBottom(): void {
    try {
      console.log('Scrolling to bottom...');
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  
  sendMessages() {
    console.log('send mess coll')
    if (this.userMessage.trim() !== '') {
      // Push user message to chatMessages
      this.chatMessages.push({ text: `You: ${this.userMessage}`, isUser: true });

      // if(!this.serviceType){
      //   if(this.userMessage == 'A' || this.userMessage == 'a'){
      //     this.serviceType = "Status Amendment"
      //     this.chatMessages.push({ text: `Please select guarantor/sponsor's status? \nA. Citizen \nB. GCC countries \nC. Foreigner \nPlease type correct option (A/B/C) in the chat`, isUser: false });
      //     this.userMessage = '';
      //     this.sendMessages();
      //   }else if (this.userMessage == 'B' || this.userMessage == 'b'){
      //     this.serviceType = "Residency renewal"
      //     this.chatMessages.push({ text: `Please select guarantor/sponsor's status? \nA. Citizen \nB. GCC countries \nC. Foreigner \nPlease type correct option (A/B/C) in the chat`, isUser: false });
      //     this.userMessage = '';
      //     this.sendMessages();
      //   }
      //   else{
      //     this.chatMessages.push({ text: `Please Enter the correct values`, isUser: false });
      //     this.sendMessages();
      //   }
      // }

      // if(!this.userType){
      //   if(this.userMessage == 'A' || this.userMessage == 'a'){
      //     this.userType = "Citizen"
      //     this.chatMessages.push({text: `You have chosen Citizen`, isUser: false})
      //     this.userMessage = '';
      //     this.chatMessages.push({text: `Please type your queries in the text box`, isUser: false})
          
      //   }
      //   else if(this.userMessage == 'B' || this.userMessage == 'b'){
      //     this.userType = "GCC"
      //     this.chatMessages.push({text: `You have chosen GCC Countries`, isUser: false})
      //     this.userMessage = '';
      //     this.chatMessages.push({text: `Please type your queries in the text box`, isUser: false})
          
      //   }
      //   else if(this.userMessage == 'C' || this.userMessage == 'c'){
      //     this.userType = "Foreign"
      //     this.chatMessages.push({text: `You have chosen Foreigner.`, isUser: false})
      //     this.userMessage = '';
      //     this.chatMessages.push({text: `Please type your queries in the text box`, isUser: false})
          
      //   }
      //   return;
      // }
  
      // if(this.serviceType && this.userType){
      //   console.log("talking to bot")
      //   this.talkToBot(this.serviceType, this.userType, this.userMessage);  
      // }else{
      //   this.sendMessages();
      // }

      // Make API call with user's auth token
      

      const apiUrl = `${this.apiUrl}${encodeURIComponent(this.userMessage)}`;
      
      console.log(`Sending API request to: ${apiUrl}`);
  
      const authToken = this.sharedService.get_uid()
      const uid = this.sharedService.get_uid() + this.sessionid
      console.log('Auth Token:', authToken); // Print authToken
      console.log(uid)
      const headers = authToken
        ? new HttpHeaders({ Authorization: `Bearer ${uid}`,  })
        : new HttpHeaders();
        console.log('Request Headers:', headers); // Log the headers
  
      this.http.get(apiUrl, { headers }).subscribe(
        (response: any) => {
          console.log('API response received:', response);
  
          if (response && response.ans) {
            // Push API response to chatMessages
            this.chatMessages.push({ text: `Bot: ${response.ans}`, isUser: false });
          } else {
            console.error('Unexpected API response format:', response);
            this.chatMessages.push({ text: `Bot: Sorry, there was an unexpected response from the server.`, isUser: false });
          }
        },
        (error: any) => {
          console.error('Error from API:', error);
          this.chatMessages.push({ text: `Bot: Sorry, there was an error processing your request. Please try again later.`, isUser: false });
        }
      );
  
      // Clear userMessage
      this.userMessage = '';
    }
  }

  talkToBot(servicetype: string, usertype: string, userMessage: string){
    const apiUrl = `${this.apiUrl}${encodeURIComponent(userMessage)}`;
      
      console.log(`Sending API request to: ${apiUrl}`);
  
      const authToken = this.sharedService.get_uid()
      const uid = "user1"
      console.log('Auth Token:', authToken); // Print authToken
  
      if(this.serviceType && this.userType){
        console.log(this.serviceType)
        console.log(this.userType)
        const headers = authToken
          ? new HttpHeaders({ Authorization: `Bearer ${uid}`, servicetype: this.serviceType, usertype: this.userType})
          : new HttpHeaders();
          console.log('Request Headers:', headers); // Log the headers
          
    
        this.http.get(apiUrl, { headers }).subscribe(
          (response: any) => {
            console.log('API response received:', response);
          
            if (response && response.ans) {
              // Push API response to chatMessages
              this.chatMessages.push({ text: `Bot: ${response.ans}`, isUser: false });
            } else {
              console.error('Unexpected API response format:', response);
              this.chatMessages.push({ text: `Bot: Sorry, there was an unexpected response from the server.`, isUser: false });
            }
          },
          (error: any) => {
            console.error('Error from API:', error);
            this.chatMessages.push({ text: `Bot: Sorry, there was an error processing your request. Please try again later.`, isUser: false });
          }
        );
      }
  }
  
  expandChat() {
    // Toggle the expansion state
    this.isExpanded = !this.isExpanded;

    // Update the width and height based on the expansion state
    const chatWindow = document.querySelector('.chat-window') as HTMLElement;
    const chatBody = document.querySelector('.chat-body') as HTMLElement;

    if (this.isExpanded) {
      // Expanded state
      chatWindow.style.width = '800px'; // Set your desired width
      chatWindow.style.height = '100vh'; // Set your desired height
      chatBody.style.maxHeight = '76vh';
    } else {
      // Reset to original state
      chatWindow.style.width = '400px'; // Set your original width
      chatWindow.style.height = '75vh'; // Set your original height
      chatBody.style.maxHeight = '60vh';
    }
  }

}
