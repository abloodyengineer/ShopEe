import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  constructor(private db:AngularFireDatabase, private shoppingCart:ShoppingCartService) { }
  
  placeOrder(order){
    let result= this.db.list('/orders').push(order)

    this.shoppingCart.clearCart()
    return result
  }

}
