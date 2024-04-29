import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from '../_model/file-handle.model';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit
{

  isNewProduct = true;
  file!:File;
  product: undefined|any = {
    productId:0,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    url:""
  };

  constructor(
    private productService: ProductService,private activatedRoute: ActivatedRoute
    
  ) {}

  ngOnInit(): void {
    //this.product = this.activatedRoute.snapshot.data['product'];
    let productId=this.activatedRoute.snapshot.paramMap.get('productId');
    console.warn("id is"+productId);
    productId && this.productService.getProductDetailsById(productId).subscribe((data)=>{
    this.product=data;
      console.warn(this.product);
      this.isNewProduct = false;
     
    });
    
   /* if(this.product && this.product.productId) {
      
    }  */
  }

  addProduct(productForm:NgForm) {
 
    this.productService.addProduct(this.product).subscribe(
      (response: Product) => {
        console.log(response);
        productForm.reset();
        this.product.url="";
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.product.url = reader.result as string;
     
        /* productForm.patchValue({
          fileSource: reader.result
        }); */
   
      };
   
    }
  }
 
}
