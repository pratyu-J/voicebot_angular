import { Component } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { HttpEventType } from '@angular/common/http'; 
import { FirebaseauthService } from '../firebaseauth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../user'; // Import the User interface
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { VoicebotComponent } from '../voicebot/voicebot.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AudioRecordingService } from '../audio-recording.service';
import { VoiceChatService } from '../voice-chat.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
  // imports: [ChatbotComponent, VoicebotComponent]
})
export class HomepageComponent {

  
  userid: string = this.sharedService.get_uid()
  usertag: string = this.sharedService.get_usertag()

  isChatOpen: boolean = false;
  chatMessages: { text: string, isUser: boolean }[] = [];
  userMessage: string = '';
  isExpanded: boolean = false;
  apiUrl: string = '';

  serviceType: string | null = null;
  userType: string | null = null;
  awaitingResponse: 'serviceType' | 'userType' | 'none' = 'serviceType';
  isRecording = false;
  audioURL: string = '';
  audioBlob: Blob | null = null;

  constructor(
    private sharedService: SharedServiceService,
    
    private dialog: MatDialog,
    private router: Router, 
    private audioRecordingService: AudioRecordingService,
    private voiceChatService: VoiceChatService,
    private http: HttpClient
  ) {
    // this.apiUrl = 'http://localhost:5050/api/questions?question=';
    // this.apiUrl = 'http://65.2.75.59:5050/api/questions?question=';

    // this.apiUrl = 'http://localhost:5050/api/voiced?question=';
    // this.apiUrl = 'http://65.2.75.59:5050/api/voiced?question=';
    this.apiUrl = 'https://gdrfabot.clires.ai/api/voiced?questions='
    
    this.serviceType = "Residency renewal"
    this.userType = "Citizen"
  }

  currentComponent: string = 'chatbot';

  toggleComponent(component: string) {
    this.currentComponent = component;
  }

  ngOnInit(){
    console.log("set username", this.usertag)

          // for voice bot
    // this.speak("What is service type?");
    this.chatMessages.push({ text: `Bot: Welcome! How may I help you?`, isUser: true });
  }

  // for voice

startRecording() {
  this.voiceChatService.convertTextToAudioStop()
  this.isRecording = true;
  this.audioRecordingService.startRecording();
}


stopRecording() {
  this.isRecording = false;
  this.audioRecordingService.stopRecording().then((audioBlob: any) => {
    this.voiceChatService.sendAudioToWhisper(audioBlob).subscribe((transcript: any) => {
      // Process the chatbot response based on the transcription
      console.log('Transcription:', transcript);
      console.log("type", typeof transcript)
      
      this.chatMessages.push({ text: `You: ${transcript}`, isUser: true });
      this.processUserMessage(transcript);
      
      // const userMessage = transcript;
      // const apiUrl = `${this.apiUrl}${encodeURIComponent(userMessage)}`;
      // console.log(`Sending API request to: ${apiUrl}`);
  
      // const authToken = this.sharedService.get_uid()
      // const uid = this.sharedService.get_uid()
      // console.log('Auth Token:', authToken); // Print authToken

      // if(this.serviceType && this.userType){
      //   const headers = authToken
      //     ? new HttpHeaders({ Authorization: `Bearer ${uid}`, servicetype: this.serviceType, usertype: this.userType })
      //     : new HttpHeaders();
      //     console.log('Request Headers:', headers); // Log the headers
          
    
      //   this.http.get(apiUrl, { headers }).subscribe(
      //     (response: any) => {
      //       console.log('API response received:', response);
          
      //       if (response && response.ans) {
      //         // Push API response to chatMessages
      //         this.speak(response.ans);
      //       } else {
      //         console.error('Unexpected API response format:', response);
      //         this.speak("Bot: Sorry, there was an unexpected response from the server.");
      //       }
      //     },
      //     (error: any) => {
      //       console.error('Error from API:', error);
      //       this.speak("Sorry, there was an error processing your request. Please try again later.");
      //     }
      //   );
      // }else{
      //   console.warn('ServiceType or UserType is missing. Cannot send the API request.');
      //   this.speak("Sorry, required information is missing to process your request.");

      // }

      // this.awaitingResponse = 'serviceType';
      // this.speak("What is service type?");
      // // Check which question we're waiting for
      // if (this.awaitingResponse === 'serviceType') {
      //   // Save the answer as serviceType
      //   this.serviceType = transcript;
      //   console.log('Service Type:', this.serviceType);

      //   // Ask the next question
      //   this.awaitingResponse = 'userType';
      //   this.speak("What is user type?");
      // } else if (this.awaitingResponse === 'userType') {
      //   // Save the answer as userType
      //   this.userType = transcript;
      //   console.log('User Type:', this.userType);

      //   // Now that both answers are received, reset awaitingResponse
      //   this.awaitingResponse = 'none';

      //   // Proceed with main API flow
      //   // this.processUserMessage();
      // }
      
    });
  });
}

speak(text: string) {
  // const speech = new SpeechSynthesisUtterance(text);
  // speech.lang = 'en-US'; // Set your preferred language
  // window.speechSynthesis.speak(speech);
  
  if(text.trim()){
    this.voiceChatService.convertTextToAudio(text);
    
  }
  
  }

  processUserMessage(userMessage: string) {
    // const userMessage = "Your main question or transcription here";
    // this.speak(userMessage)
    const apiUrl = `${this.apiUrl}${encodeURIComponent(userMessage)}`;
  
    console.log(`Sending API request to: ${apiUrl}`);
  
    const authToken = this.sharedService.get_uid(); // Get the authentication token
    const uid = this.sharedService.get_uid();       // Get the UID (same as authToken here)
    console.log('Auth Token:', authToken);
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${uid}`,
      });
      console.log('Request Headers:', headers);
  
      this.http.get(apiUrl, { headers }).subscribe(
        (response: any) => {
          console.log('API response received:', response);
  
          if (response && response.ans) {
            this.speak(response.ans); // Read bot's response aloud
            this.chatMessages.push({ text: `You: ${response.ans}`, isUser: true });
          } else {
            console.error('Unexpected API response format:', response);
            this.speak("Sorry, there was an unexpected response from the server.");
          }
        },
        (error: any) => {
          console.error('Error from API:', error);
          this.speak("Sorry, there was an error processing your request. Please try again later.");
        }
      );
    
  }

}

  

  
  

  

  

  

  


