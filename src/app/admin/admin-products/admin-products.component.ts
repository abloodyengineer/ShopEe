import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import { DataTableResource } from 'angular-4-data-table'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products:any[];
  filteredProducts:any[]
  subscription:Subscription;
  items:any[]
  // tableResource:DataTableResource<any>
  itemCount;


  constructor(private productService: ProductService) { 
    this.subscription= this.productService.getAll().subscribe(prod=>{
      this.filteredProducts=this.products=prod
      this.initializeTable(prod)
      })
    }
    
    private initializeTable(prod){
      // this.tableResource=new DataTableResource(prod)
      // this.tableResource.query({offset:0}).then(items=> this.items=items)

      // this.tableResource.count().then(count=> this.itemCount=count)
    }
  
    reload(params){
      // if(!this.tableResource) return
      // this.tableResource.query(params).then(items=> this.items=items)

    }

  filter(query){
    this.filteredProducts=(query)?
    this.products.filter(p=> p.payload.val().title.toLowerCase().includes(query.toLowerCase())):
    this.products
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
