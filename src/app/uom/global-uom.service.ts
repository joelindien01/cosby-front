import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {Currency, UnitOfMeasurement} from "./UnitOfMeasurement";
import {ReferenceDataDTO} from "./list-uom/list-uom.component";

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

  save(value: any) {
    return this.httpClient.post(this.baseUrl, value);
  }

  findAll(): Observable<Array<ReferenceDataDTO>> {
    return this.httpClient.get<Array<ReferenceDataDTO>>(this.baseUrl);
  }
}
