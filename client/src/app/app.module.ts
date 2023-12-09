import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from '@components/navbar/navbar.component';
import {HomeComponent} from '@components/home/home.component';
import {LoginComponent} from '@components/login/login.component';
import {SignupComponent} from '@components/signup/signup.component';
import {MovieListComponent} from '@components/movie-list/movie-list.component';
import {MovieDetailComponent} from '@components/movie-details/movie-details.component';
import {ActorDetailsComponent} from '@components/actor-details/actor-details.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {provideFirebaseApp, initializeApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {environment} from '../environments/environments';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {DropdownMenuComponent} from '@components/dropdown-menu/dropdown-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {NotificationComponent} from '@components/notification/notification.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";


import {MatBadgeModule} from '@angular/material/badge'; // <-- Import this
import {MatButtonModule} from '@angular/material/button';
import {SearchBarComponent} from '@components/search-bar/search-bar.component';
import {NavbarMiddleComponent} from '@components/navbar-middle/navbar-middle.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {SearchResultComponent} from '@components/search-result/search-result.component';
import {MovieGridComponent} from '@components/movie-grid/movie-grid.component';
import {FootComponent} from '@components/foot/foot.component';
import {SnackbarComponent} from '@components/snackbar/snackbar.component';
import {FriendsComponent} from '@components/friends/friends.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AddFollowerDialogComponent} from '@components/friends/add-follower-dialog/add-follower-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AppUserCardComponent} from '@components/friends/app-user-card/app-user-card.component';
import {MatCardModule} from "@angular/material/card";
import {UserProfileComponent} from '@components/user-profile/user-profile.component';
import {ConfirmDeleteDialogComponent} from '@components/confirm-delete-dialog-component/confirm-delete-dialog.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { FavoriteListsComponent } from '@components/favorite-item-lists/favorite-item-lists.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { ItemComponent } from '@components/favorite-item-lists/item/item.component';
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";
import { CreateListComponent} from '@components/favorite-item-lists/create-list/create-list.component';
import {NgOptimizedImage} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import { EditListComponent } from '@components/favorite-item-lists/edit-list/edit-list.component';
import {MatChipsModule} from "@angular/material/chips";
import { DashboardComponent } from '@components/dashboards/dashboard/dashboard.component';
import { FavoriteItemListsDashboardComponent } from '@components/dashboards/favorite-item-lists-dashboard/favorite-item-lists-dashboard.component';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";

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
    SnackbarComponent,
    FriendsComponent,
    AddFollowerDialogComponent,
    AppUserCardComponent,
    UserProfileComponent,
    ConfirmDeleteDialogComponent,
    FavoriteListsComponent,
    ItemComponent,
    CreateListComponent,
    EditListComponent,
    DashboardComponent,
    FavoriteItemListsDashboardComponent,
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
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatLineModule,
    NgOptimizedImage,
    MatTooltipModule,
    MatChipsModule,
    CanvasJSAngularChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
