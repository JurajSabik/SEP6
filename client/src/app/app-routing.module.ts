import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {MovieDetailComponent} from './components/movie-details/movie-details.component';
import {ActorDetailsComponent} from './components/actor-details/actor-details.component';
import {SearchResultComponent} from './components/search-result/search-result.component';
import {FriendsComponent} from "./components/friends/friends.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {FavoriteListsComponent} from "./components/favorite-item-lists/favorite-item-lists.component";
import {CreateListComponent} from "./components/favorite-item-lists/create-list/create-list.component";
import {EditListComponent} from "./components/favorite-item-lists/edit-list/edit-list.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'movie', component: MovieListComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: 'tv', component: MovieListComponent},
  {path: 'tv/:id', component: MovieDetailComponent},
  {path: 'credits/:id', component: ActorDetailsComponent},
  {path: 'actor/:id', component: ActorDetailsComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'profile/:userId', component: UserProfileComponent },
  {path: 'results', component: SearchResultComponent},
  {path: 'favorite-item-list/:userId', component: FavoriteListsComponent},
  {path: 'create-list/:userId', component: CreateListComponent},
  {path: 'edit-list/:listId', component: EditListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
