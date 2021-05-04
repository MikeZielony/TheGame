import {Component, Input, OnInit} from '@angular/core';
import {ColorUser, User} from "../models/user";
import {UserService} from "../services/user.service";
import {IUserDto} from "../models/user";
import {colors} from "@angular/cli/utilities/color";
import {BoardService} from "../services/board.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, IUserDto {

  color!: string;
  active: boolean = false;
  key!: string;
  name!: string;
  position!: number;
  isMove: boolean = false;
  picture!: string;
  hash!: string


  user = new User({active: false, color: "",key: "", name: "", position: 0, picture: "", isMove: false, hash: this.boardService.makeHash(12)});
  submitted = false;

  constructor(private userService: UserService, public boardService: BoardService) {
  }

  ngOnInit(): void {
  }

  saveUser(): void {
    this.userService.create(this.user).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;
    })
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User(<IUserDto><any>[]);
  }
}
