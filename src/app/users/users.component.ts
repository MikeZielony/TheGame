import {Component, Injectable, Input, OnInit} from '@angular/core';
import {BoardService} from "../services/board.service";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import {UserService} from "../services/user.service";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {IUserDto, User} from "../models/user";
import {Router} from "@angular/router";
import { HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, HttpClientModule {

  @Injectable({
    providedIn: 'root'
  })

  users!: User[];

  message = '';


  constructor(public boardService: BoardService, public userService: UserService, public router: Router) {
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }




  retrieveUsers(): void {
    this.userService.getAll().snapshotChanges().pipe(
      map((changes: any) => (
        changes.map((c: { payload: { key: any; val: () => any; }; }) =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))
      )
    ).subscribe((data: IUserDto[]) => {
      this.users = data.map(item => new User(item));
    });
  }

  refreshList(): void {
    this.userService.currentUser = {};
    this.userService.currentIndex = -1;
    this.retrieveUsers();
  }

  removeAllUsers(): void {
    this.userService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  changeActive(value: boolean): void {
    this.toggleFlag(value);
    this.updateUser();
    console.log("test");
  }

  updateUser(): void {
   this.userService.setActiveUser(this.userService.currentUser, this.userService.currentIndex);
    const data = {
      active: this.userService.currentUser.active,
      position: this.userService.currentUser.position
    }
    this.userService.update(this.userService.currentUser.key, data)
      .then(() => this.message = 'The account was updated successfully!')
      .catch(err => console.log(err));
    this.router.navigate([`user/${this.userService.currentUser.hash}`]);
  }

  toggleFlag(value: boolean): boolean{
    this.userService.currentUser.active = value ? false : true;
    return this.userService.currentUser.active;
  }

  action(user: any, index: number): void {
    this.userService.setActiveUser(user, index);
    console.log(this.userService.currentUser);
    this.toggleFlag(this.userService.currentUser.active);
    this.updateUser();
    // this.router.navigate([`user/${this.userService.currentUser.hash}`]);
  }
}
