import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  pageNumber:number=0;
  showloadbutton=false;
  products:Product[]=[];
  public prodlist:any;
  constructor(private productService:ProductService,private router:Router){}
  ngOnInit(): void {
    this.getAllProducts();
  }
getAllProducts(searchKey:string="")
{
  this.productService.getAllProducts(this.pageNumber,searchKey).subscribe(response=>{
    if(response.length==10)
    {
      this.showloadbutton=true;
    }
    else{
      this.showloadbutton=false;
    }
    response.forEach(p=>this.products.push(p));

   // this.products=response;
  })
}
  /* showProductDetails(productId) {
    //this.router.navigate(['/productViewDetails', {productId: productId}]);
  } */
  loadmoreProduct()
  {
    this.pageNumber=this.pageNumber+1;
    this.getAllProducts();
  }
  showProductDetails(productId:number)
  {
    this.router.navigate(['/productViewDetails', {productId: productId}]); 
  }


  searchByKeyword(searchkeyword:any) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.products= [];
    this.getAllProducts(searchkeyword);
  }
}
