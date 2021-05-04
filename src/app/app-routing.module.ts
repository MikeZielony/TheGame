import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {UsersComponent} from "./users/users.component";
import {BoardComponent} from "./board/board.component";
import {AddUserComponent} from "./add-user/add-user.component";

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {
    path: 'user/:hash',
    component: BoardComponent,
  },
  {path: 'user', component: UsersComponent},
  {path: 'board', component: BoardComponent},
  {path: 'adduser', component: AddUserComponent},
  {path: 'start', component: StartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
