import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {IUserDto, User} from "../models/user";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  message = '';
  private dbPath = '/';

  public currentUser: any;
  currentIndex = -1;
  player: any;
  users!: User[];

  usersRef: AngularFireList<User>;


  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<User> {
    return this.usersRef;
  }

  retrieveUsers1(): void {
    this.getAll().snapshotChanges().pipe(
      map((changes: any) => (
        changes.map((c: { payload: { key: any; val: () => any; }; }) =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))
      )
    ).subscribe((data: IUserDto[]) => {
      this.users = data.map(item => new User(item));
    });
  }

  create(user: User): any {
    return this.usersRef.push(user);
  }

  update(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.usersRef.remove();
  }
  setActiveUser(user: any, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
    this.player = user;

  }

  retrieveUsers(): void {
    this.getAll().snapshotChanges().pipe(
      map((changes: any) => (
        changes.map((c: { payload: { key: any; val: () => any; }; }) =>
          ({ key: c.payload.key, ...c.payload.val() })
        ))
      )
    ).subscribe((data: IUserDto[]) => {
      this.users = data.map(item => new User(item));
    });
  }

}
