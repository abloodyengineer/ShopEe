import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form2',
  templateUrl: './product-form2.component.html',
  styleUrls: ['./product-form2.component.css']
})
export class ProductForm2Component implements OnInit {
  categories$;
  product:any={
    value:{},
    key: {}
  }; 
  id;
  constructor(
    private router: Router, 
    private categoryService: CategoryService, 
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();

    this.id=this.route.snapshot.paramMap.get('id')
    if(this.id) {
      console.log(this.id)
     this.productService.get(this.id).subscribe(p=>{
      this.product=p
    })
  }
    // console.log(this.productService.get(id))
  }

  save(product) { 
    if(this.id){
      this.productService.update(this.id,product)
    }
    else{
    this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
    
  }

  delete(){
    if(confirm("Are you sure you want to delete this product?")){
      this.productService.remove(this.id)
      this.router.navigate(['/admin/products']); 
    }
    
  }

  ngOnInit() {
  }

}
