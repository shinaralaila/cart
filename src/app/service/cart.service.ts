import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
public cartItemList:any=[]
public productList=new BehaviorSubject<any>([])  //it can act as observable ie emit data , we can pass data and ,we can subscribe whenever data is emitted
  constructor() { }
  getProducts(){
    return this.productList.asObservable();//return the data present in the productList
  }
  setProduct(product:any){
    this.cartItemList.push(...product) //push product to cartItemList
this.productList.next(product) //data is passed wherever it is subcsribed 
  }
  addtoCart(product:any){
    this.cartItemList.push(product)//perticular product is pushed to the cart
    this.productList.next(this.cartItemList)
    this.getTotalPrice()
  }
  getTotalPrice(){
    let grandTotal=0;
    this.cartItemList.map((a:any)=>
    {
      grandTotal +=a.total
    } )//a will take everything in the cartlistitem
 return grandTotal }
  removeCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>  //map the data as per requirement,index help in removing the slected data
    {
      if(product.id===a.id){                //if product id matches id of product present in productItemlist
        this.cartItemList.splice(index,1)   //remove matching index item from this.cartItemList
      }
    })
    this.productList.next(this.cartItemList)
  }
  removeAllCart(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList)
  }
}
