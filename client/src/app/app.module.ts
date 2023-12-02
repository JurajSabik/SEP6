import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-details/movie-details.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environments';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import { NotificationComponent } from './components/notification/notification.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";


import { MatBadgeModule } from '@angular/material/badge'; // <-- Import this
import { MatButtonModule } from '@angular/material/button';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavbarMiddleComponent } from './components/navbar-middle/navbar-middle.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';
import { FootComponent } from './components/foot/foot.component';



const routes: Routes = [
  { path: 'movie/:name', component: MovieDetailComponent },
  // ... other routes
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    MovieListComponent,
    MovieDetailComponent,
    ActorDetailsComponent,
    DropdownMenuComponent,
    NotificationComponent,
    SearchBarComponent,
    NavbarMiddleComponent,
    SearchResultComponent,
    MovieGridComponent,
    FootComponent,
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
