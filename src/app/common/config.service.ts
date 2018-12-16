import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'assets/url-config.json';

  constructor(private http:HttpClient) { }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }


}

export interface Config {
  addCustomer: string;
}
