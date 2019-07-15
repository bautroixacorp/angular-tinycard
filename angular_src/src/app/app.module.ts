import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { CreateComponent } from './create/create.component';
import { BackcardComponent } from './create-card-backcard/backcard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { DeskComponent } from './profile-desk/desk.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { DecksComponent } from './decks/decks.component';
import { DecksCardComponent } from './decks-card/decks-card.component';
import { LearnComponent } from './learn/learn.component';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, 
  {
    path: 'create', 
    component: CreateComponent,
    data: { title: 'Create page' }
  },
  {
    path: 'create/:id', 
    component: CreateComponent,
    data: { title: 'Create page with title' }
  },
  {
    path: 'profile', 
    component: ProfileComponent,
    data: { title: 'Profile page' }
  },
  {
    path: 'user/:id', 
    component: ProfileComponent,
    data: { title: 'Profile with id page' }
  },
  {
    path: 'profile/settings', 
    component: ProfileSettingComponent,
    data: { title: 'Profile Setting page' }
  },
  {
    path: 'deck/:id', 
    component: DecksComponent,
    data: { title: 'Deck show page' }
  },
  {
    path: 'learn/:id', 
    component: LearnComponent,
    data: { title: 'Learn desk page' }
  },
  { path: '**', component: NotFoundComponent } //notfound component
];

@NgModule({
  declarations: [
    AppComponent,
    CreateCardComponent,
    CreateComponent,
    BackcardComponent,
    NavbarComponent,
    ProfileComponent,
    DeskComponent,
    NotFoundComponent,
    ProfileSettingComponent,
    DecksComponent,
    DecksCardComponent,
    LearnComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
