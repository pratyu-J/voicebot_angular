import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { HeadersComponent } from './headers/headers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Add this import
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { VoicebotComponent } from './voicebot/voicebot.component';
import { TextbotComponent } from './textbot/textbot.component';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    ChatbotComponent,
    HeadersComponent,
    VoicebotComponent,
    TextbotComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
