import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailComponent } from './components/movie-details/movie-details.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'movie', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'tv', component: MovieListComponent },
  { path: 'tv/:id', component: MovieDetailComponent },
  { path: 'credits/:id', component: ActorDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
