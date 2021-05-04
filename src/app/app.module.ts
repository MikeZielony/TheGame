import {BrowserModule} from "@angular/platform-browser";
import { NgModule} from "@angular/core";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BoardComponent} from './board/board.component';
import {UsersComponent} from './users/users.component';
import {StartComponent} from './start/start.component';
import {CellComponent} from './cell/cell.component';
import {AddUserComponent} from './add-user/add-user.component';
import {FormsModule} from "@angular/forms";
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment'
import {AngularFirestore} from "@angular/fire/firestore";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    UsersComponent,
    StartComponent,
    CellComponent,
    AddUserComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {
}
