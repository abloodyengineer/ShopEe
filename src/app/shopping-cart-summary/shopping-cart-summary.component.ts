import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
cart:any
  totalQuantity: number;
  cart$: any;
  shoppingCartItemCount: number;
  itemCount: any;
  constructor(private shoppingCartService:ShoppingCartService) {
    this.cart$=shoppingCartService.getCart()
    
    this.cart$.subscribe(cart=>{
      this.shoppingCartItemCount=shoppingCartService.getTotalItemCount(cart)
      this.cart=cart})
      console.log(this.cart$)
   }
  ngOnInit(): void {
  }
  calculateTotalPrice(a,b){
    return a*b;
  }
}
