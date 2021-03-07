import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {Category, Currency, UnitOfMeasurement} from "./UnitOfMeasurement";

@Injectable({
  providedIn: 'root'
})
export class GlobalUomService {

  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"ref-data/";

  constructor(private httpClient: HttpClient) { }

  findAllUOM(): Observable<Array<UnitOfMeasurement>> {
    return this.httpClient.get<Array<UnitOfMeasurement>>(this.baseUrl+"uom");
  }

  findAllCurrencyList(): Observable<Array<Currency>> {
    return this.httpClient.get<Array<UnitOfMeasurement>>(this.baseUrl+"currency");
  }

  findAllCategoriesList(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(this.baseUrl+"category");
  }
}
