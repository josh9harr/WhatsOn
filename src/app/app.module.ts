import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';


//Components
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DisplayComponent } from './display/display.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultComponent } from './result/result.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChannelShowsComponent } from './channel-shows/channel-shows.component';
import { compileBaseDefFromMetadata } from '@angular/compiler';
import { MoviesComponent } from './movies/movies.component';
import { ShowsComponent } from './shows/shows.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    SearchComponent,
    DisplayComponent,
    ProfileComponent,
    ResultComponent,
    ChannelsComponent,
    ChannelShowsComponent,
    MoviesComponent,
    ShowsComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AppRoutingModule,
    MatTabsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: "/home", pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'shows', component: ShowsComponent},
      {path: 'movies', component: MoviesComponent},
      {path: 'display/:type/:id', component: DisplayComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'results/:title', component: ResultComponent},
      {path: 'channels', component: ChannelsComponent},
      {path: 'channels/:name', component: ChannelShowsComponent}
    ]),
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
