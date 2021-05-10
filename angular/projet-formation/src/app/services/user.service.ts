import {User} from '../models/User.model';
import {Subject} from 'rxjs';

export class UserService {
  private users: User[] = [
    {
      firstName: 'Kobe',
      lastName: 'Bryan',
      email: 'kobeBryant@gmail.com',
      drinkPreference: 'coca',
      hobbies: [
        'BaksetBall',
        'Lakers'
      ]
    }
  ];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
