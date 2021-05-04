import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  userPoints = 0;
  rollValue = 0;
  active = false;
  value = true;
  length= 10;

  constructor(public userService: UserService) { }

  rollDice(): number {
    return 1 + Math.floor(Math.random() * 6)
  }

  addPoints():number {

    this.userService.currentUser.position += this.rollDice();
    const data = {
      position: this.userService.currentUser.position
    }
    this.userService.update(this.userService.currentUser.key, data)
    // this.toggleFlag(this.active);
    return this.userPoints;
  }

  clear(): void {
    this.userPoints = 0;
  }

  toggleFlag(value: boolean): boolean{
    this.active = value ? false : true;
    return this.active;
  }

  makeHash(length: number) {
   let result           = [];
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let  charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() *
        charactersLength)));
    }
    return result.join('');
  }




}
