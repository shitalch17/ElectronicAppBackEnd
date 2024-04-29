import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService: ProductService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id =route.paramMap.get("productId");
        
    if (id) {
      //then we have to fetch details from backend
       return this.productService.getProductDetailsById(id)
            
    } else {
      // return empty product observable.
      return of(this.getProductDetails());
    }
  }
  getProductDetails():any {
    return {
      productId:0,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      url:"",
    };
  }
}
