import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{
 isSingleProductCheckout: string|null = '';
  productDetails: Product[] = [] ;

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }
  constructor( private productService: ProductService,private activatedRoute: ActivatedRoute,private router:Router){}
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('productId');
    console.log("id"+id);
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
   this.productService.getProductDetails(this.isSingleProductCheckout,id).subscribe(response=>{
      this.productDetails=response;
    console.log(this.productDetails);
    this.productDetails.forEach(x=>this.orderDetails.orderProductQuantityList.push(
      {productId:x.productId,quantity:1}
    )
      );
     // console.log(this.orderDetails);
  })
   //this.productDetails=this.productService.getProductDetails(isSingleProductCheckout,id);
  
     
  }

  public placeOrder(orderForm:NgForm)
  {
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      response=>{
        console.log(response);
        orderForm.reset();
        this.router.navigate(["/orderconfirm"])
      },
      (err)=>
      {
        console.log(err);
      }
    );
  }


  getQuantityForProduct(productId:number):number
  {
      var filteredProduct=this.orderDetails.orderProductQuantityList.filter((productQuantity)=> productQuantity.productId === productId
      );
      console.log("q "+filteredProduct[0].quantity);
      return filteredProduct[0].quantity;
  }

  getCalculatedTotal(productId:number,productDiscountedPrice:number):number
  {
    var filteredProduct=this.orderDetails.orderProductQuantityList.filter((productQuantity)=>productQuantity.productId === productId);
    
    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged(q:any,productId:number)
  { 
    this.orderDetails.orderProductQuantityList.filter((orderProduct)=>orderProduct.productId === productId)[0].quantity=q;
  }

  getGrandTotal()
  {
    let grandTotal=0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>
      {
        const price=this.productDetails.filter(product=>product.productId===productQuantity.productId)[0].productDiscountedPrice;
        grandTotal= grandTotal + price * productQuantity.quantity;
      }
    )
    return grandTotal;
  }
}
