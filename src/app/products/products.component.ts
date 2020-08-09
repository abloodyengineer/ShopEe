import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {
  
products=[];
categories$;
category;
filteredProducts=[];
showActions=true;
shoppingCart;
subscription:Subscription
cart;
  constructor(productService: ProductService, categoryService:CategoryService, route: ActivatedRoute, private shoppingCartService: ShoppingCartService) {

   this.subscription= shoppingCartService.getCart().subscribe(cart=> this.cart=cart.payload.val())

    productService.getAll().pipe(switchMap(p=> {
        this.products=p
    return route.queryParamMap
    }))
    .subscribe(params=>{
        this.category=params.get('category')
      
        this.filteredProducts=(this.category)?
        this.products.filter(p=> {
          console.log(this.category)
          return p.payload.val().category === this.category
          console.log(p.payload.val().category)
        }):
        this.products
      }) 
      this.categories$=categoryService.getCategories()

    
   }

   addToCart(product){
      this.shoppingCartService.addToCart(product)
   }

   removeFromCart(product){
     this.shoppingCartService.deleteProduct(product)
   }

   getQuantity(c){
     if(!this.cart) return 0;
      let item=this.cart.items?this.cart.items[c.key]:""
      
      return (item)?item.quantity:0

   }
    
  ngOnInit() {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
