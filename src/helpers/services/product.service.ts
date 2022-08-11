import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { IDisplayProducts } from '../interfaces/idisplay-products';
import { IProduct } from '../interfaces/iproduct';
import { GenericApiHandlerService } from './generic-api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productApi:string = "http://localhost:3000/products";
  constructor(private httpClient:HttpClient,private gerericService:GenericApiHandlerService) {
    
   }

   addNewProduct(model:IProduct):Observable<IProduct>
   {
    return this.httpClient.post<IProduct>(this.productApi,model,this.gerericService.httpOptions)
    .pipe(catchError(error=>this.gerericService.handleError(error)));
   }
   getAllProducts():Observable<IDisplayProducts[]>
   {
    return this.httpClient.get<IDisplayProducts[]>(this.productApi,this.gerericService.httpOptions).
           pipe(
            catchError(error=>this.gerericService.handleError(error))
           );
   }
   deleteProduct(id:number):Observable<boolean>
   {
     return this.httpClient.delete<boolean>(`${this.productApi}/${id}`).pipe(
      catchError(error=>this.gerericService.handleError(error))
    );
   }
   getProductById(id:number):Observable<IProduct>{
    return this.httpClient.get<IProduct>(this.productApi+"/"+id)
    .    pipe(retry(3),catchError((error)=>this.gerericService.handleError(error)));
  } 
  getProductInDetailsById(id:number):Observable<IDisplayProducts>{
    return this.httpClient.get<IDisplayProducts>(this.productApi+"/"+id)
    .    pipe(retry(3),catchError((error)=>this.gerericService.handleError(error)));
  } 
  updateProduct(id:number,model:IProduct):Observable<boolean>
  {
    return this.httpClient.put<boolean>(`${this.productApi}/${id}`,model,this.gerericService.httpOptions).pipe(
      catchError(error=>this.gerericService.handleError(error))
    );
  }
  
}
