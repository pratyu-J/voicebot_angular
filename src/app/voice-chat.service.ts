import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceChatService {

  private whisperApiUrl = 'https://api.openai.com/v1/whisper/transcribe';

  // private proxyApiUrl = 'http://localhost:3000/transcribe';
  // private proxyApiUrl = 'http://3.110.10.230:3000/transcribe';
  private proxyApiUrl = 'https://gdrfabot.clires.ai/whisper/transcribe';

  // private apiurl = 'http://localhost:5050/speech';
  // private apiurl = 'http://3.110.10.230:5050/speech';
  private apiurl = 'https://gdrfabot.clires.ai/chatbot/speech';

  private audio = new Audio()

  isAudioPlaying = false;
  constructor(private http: HttpClient) { }

  sendAudioToWhisper(audioBlob: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');

    const headers = new HttpHeaders({
      'Authorization': `Bearer OPENAI_key`
    });

    return this.http.post(this.proxyApiUrl, formData, { headers });
  }

  convertTextToAudio(text: string){
    console.log(text)
    return this.http.post(this.apiurl, {input: text}, { responseType: 'blob'})
    .subscribe((audioBlob) => {
      //create an audio object and set the blob url
      const audioUrl = URL.createObjectURL(audioBlob);
      this.audio = new Audio(audioUrl)
      this.audio.play();
    //   this.audio.addEventListener('play', () => {
    //     this.isAudioPlaying = true;
    //   });
    //   this.audio.addEventListener('ended', () => {
    //     this.isAudioPlaying = false;
    //   });
    //   this.audio.play();
    // }, error => {
    //   console.error("error converting text to audio:", error);
    //   this.isAudioPlaying = false; // Set to false on error
    // });
      
    }, error =>{
      console.error("error converting text to audio:", error);
    });
  }

  convertTextToAudioStop(){
      this.audio.pause();   
  }

}
