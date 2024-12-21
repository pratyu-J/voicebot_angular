import { Component } from '@angular/core';
import { SharedServiceService } from '../shared-service.service';
import { HttpEventType } from '@angular/common/http'; 
import { FirebaseauthService } from '../firebaseauth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../user'; // Import the User interface
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AudioRecordingService } from '../audio-recording.service';
import { VoiceChatService } from '../voice-chat.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voicebot',
  templateUrl: './voicebot.component.html',
  styleUrls: ['./voicebot.component.css']
})
export class VoicebotComponent {

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
  private apiurl = 'https://gdrfabot.clires.ai/chatbot/speech';
  // private audio = new Audio()
  audio: HTMLAudioElement | undefined;
  isAudioPlaying = false;

  sessionid: any;

  constructor(
    private sharedService: SharedServiceService,
    
    private dialog: MatDialog,
    private router: Router, 
    private audioRecordingService: AudioRecordingService,
    private voiceChatService: VoiceChatService,
    private http: HttpClient
  ) {
    // this.apiUrl = 'http://localhost:5050/api/questions?question=';
    // this.apiUrl = 'http://3.110.10.230:5050/api/questions?question=';

    // this.apiUrl = 'http://localhost:5050/api/voiced?question=';
    this.apiUrl = 'https://gdrfabot.clires.ai/chatbot/api/voiced?question=';

    
    
    this.serviceType = "Residency renewal"
    this.userType = "Citizen"
  }

  closeVoiceBot() {
    this.stopAudio()
    this.isChatOpen = false;
    this.serviceType = null;
    this.userType = null;
    this.chatMessages = [];
    this.sessionid = null;
    this.sharedService.set_voiceSession(null)
  }

  minimizeChat() {
    this.stopAudio()
    this.isChatOpen = false;
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen && this.chatMessages.length === 0) {
    // const sesid = this.sharedService.get_voiceSession()
        if(this.sessionid == null){
          console.log("creating sess id")
          this.genSessionId()
        }
        // else{
        //   this.sessionid = sesid;
        // }

    this.chatMessages.push({ text: `Bot: Welcome! How may I help you?`, isUser: false });
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

  ngOnInit(){
    console.log("set username", this.usertag)

          // for voice bot
    // this.speak("What is service type?");
    this.genSessionId()
    console.log(this.sessionid)

  }

  genSessionId(){

    // Generate a random 8-digit integer
    const min = 10000000; // Minimum 8-digit number
    const max = 99999999; // Maximum 8-digit number
    this.sessionid = Math.floor(Math.random() * (max - min + 1)) + min;
    this.sharedService.set_voiceSession(this.sessionid)
  
}

  toggleRecording(){
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.startRecording();
    } else {
      this.stopRecording();
    }
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isAudioPlaying = false;
    }
  }

  startRecording() {
    this.stopAudio()
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
        
        
      });
    });
  }
  
  speak(text: string) {
    // const speech = new SpeechSynthesisUtterance(text);
    // speech.lang = 'en-US'; // Set your preferred language
    // window.speechSynthesis.speak(speech);
    
    if(text.trim()){
      this.convertTextToAudio(text);
      
    }
    
    }

    convertTextToAudio(text: string){
      return this.http.post(this.apiurl, {input: text}, { responseType: 'blob'})
      .subscribe((audioBlob) => {
        //create an audio object and set the blob url
        const audioUrl = URL.createObjectURL(audioBlob);
        this.audio = new Audio(audioUrl)
        // this.audio.play();
        this.audio.addEventListener('play', () => {
          this.isAudioPlaying = true;
        });
        this.audio.addEventListener('ended', () => {
          this.isAudioPlaying = false;
        });
        this.audio.play();
      }, error => {
        console.error("error converting text to audio:", error);
        this.isAudioPlaying = false; // Set to false on error
      });
        
      // }, error =>{
      //   console.error("error converting text to audio:", error);
      // });
    }
  
    processUserMessage(userMessage: string) {
      // const userMessage = "Your main question or transcription here";
      // this.speak(userMessage)
      const apiUrl = `${this.apiUrl}${encodeURIComponent(userMessage)}`;
    
      console.log(`Sending API request to: ${apiUrl}`);
    
      const authToken = this.sharedService.get_uid(); // Get the authentication token
      const uid = this.sharedService.get_uid() + this.sessionid     // Get the UID (same as authToken here)
      console.log('Auth Token:', authToken);
      console.log('Auth Token:', uid);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${uid}`,
        });
        console.log('Request Headers:', headers);
    
        this.http.get(apiUrl, { headers }).subscribe(
          (response: any) => {
            console.log('API response received:', response);
    
            if (response && response.ans) {
              this.speak(response.ans); // Read bot's response aloud
              this.chatMessages.push({ text: `Bot: ${response.ans}`, isUser: false });
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
