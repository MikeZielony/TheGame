import {Injectable, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {IUserDto, User} from "../models/user";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit{

  usersRef: AngularFireList<User>;
  message = '';
  private dbPath = '/';

  public currentUser: any;
  currentIndex = -1;
  player: any;
  users!: User[];

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  getAll(): AngularFireList<User> {
    return this.usersRef;
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
  }create(user: User): any {
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
}
