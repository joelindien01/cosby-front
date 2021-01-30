import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {Account} from "../bill/bill";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = environment.apiUrl;
  baseUrl= this.apiUrl+"account/";

  constructor(private httpClient: HttpClient) { }

  findAllAccounts(): Observable<Array<Account>> {
    return this.httpClient.get<Array<Account>>(this.baseUrl);
  }


}
