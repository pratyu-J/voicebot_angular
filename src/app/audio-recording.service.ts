import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {

  constructor() { }

  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];

  startRecording(): Promise<void> {
    return navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.mediaRecorder.ondataavailable = (event) => this.audioChunks.push(event.data);
      });
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve) => {
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.audioChunks = [];
        resolve(audioBlob);
      };
      this.mediaRecorder.stop();
    });
  }
  
}
