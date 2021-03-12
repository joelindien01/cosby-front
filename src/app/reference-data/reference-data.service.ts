import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Category, Currency, LinkedProductGroup, UnitOfMeasurement} from "../uom/UnitOfMeasurement";

import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReferenceDataService {

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

  findAllGroup(): Observable<Array<LinkedProductGroup>> {
    return this.httpClient.get<Array<LinkedProductGroup>>(this.baseUrl+"group");
  }

  saveProductGroup(group): Observable<any> {
    console.log(group);
    return this.httpClient.post(this.baseUrl+"group", group);
  }
}
