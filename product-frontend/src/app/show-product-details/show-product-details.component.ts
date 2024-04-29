import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  pageNumber: number = 0;
  showloadbutton = false;
  showTable = false;
  products: Product[] = [];
  displayedColumns: string[] = ['Id', 'Product Name', 'description', 'Product Discounted Price', 'Product Actual Price', 'Actions'];
  constructor(private productService: ProductService, public imagesDialog: MatDialog, private router: Router) { }
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(searchKey: string = "") {
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKey).subscribe(response => {

      if (response.length == 10) {
        this.showloadbutton = true;
      }
      else {
        this.showloadbutton = false;
      }
      response.forEach(p => this.products.push(p));
      //this.products=response;
      this.showTable = true;
    })
  }
  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.url
      },
      height: '500px',
      width: '800px'
    });
  }
  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  editProductDetails(productId: number) {

    this.router.navigate(['/addNewProduct', { productId: productId }]);
  }

  loadmoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllProducts();
  }
  searchByKeyword(searchkeyword: string) {
    this.pageNumber = 0;
    this.products = [];
    this.getAllProducts(searchkeyword);
  }
}
