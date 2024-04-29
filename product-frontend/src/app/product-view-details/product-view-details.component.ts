import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  product!:Product;
  constructor( private productService: ProductService,private activatedRoute: ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    //paramMap is used to retrive data from url
    let productId=this.activatedRoute.snapshot.paramMap.get('productId');
    console.warn("id is"+productId);
    productId && this.productService.getProductDetailsById(productId).subscribe((data)=>{
    this.product=data;
      console.warn(this.product);
     
     
    });
  }



  addToCart(productId:number)
  {
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      }, (error)=> {
        console.log(error);
      }
    );
  }

  buyProduct(productId:number)
  {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout:true, productId:productId
    }]);
  }
  
}
