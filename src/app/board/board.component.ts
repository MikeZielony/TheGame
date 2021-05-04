import {Component, Injectable, OnInit} from '@angular/core';
import {BoardService} from "../services/board.service";
import {ColorUser, IUserDto, User} from "../models/user";
import { UserService} from "../services/user.service";
import {UsersComponent} from "../users/users.component";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [UsersComponent]
})
export class BoardComponent implements OnInit, HttpClientModule {
  @Injectable({
    providedIn: 'root'
  })

  name = '';
  position = 0;
  color = ColorUser.blue;
  active = false;
  //currentUser: User = {} as User;




  constructor(public boardService: BoardService, public userService: UserService, public user: UsersComponent) {
  }

  ngOnInit(): void {
  }


}
