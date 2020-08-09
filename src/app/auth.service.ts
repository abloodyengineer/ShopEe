import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { map,switchMap } from 'rxjs/operators';

import * as firebase from 'firebase'; 

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;    
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() { 
    this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null);
      })
    );    
  }
}
