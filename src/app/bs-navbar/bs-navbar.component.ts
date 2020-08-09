import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;
  shoppingCartItemCount:number;
  constructor(private auth: AuthService, private shoppingCartService:ShoppingCartService) { 
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
    shoppingCartService.getCart().subscribe(cart=>{
      this.shoppingCartItemCount=shoppingCartService.getTotalItemCount(cart)
    })
  }

  logout() {
    this.auth.logout();
  }

}
