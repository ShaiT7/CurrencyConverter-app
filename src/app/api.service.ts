import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//const API_URL = 'https://reqres.in';
const Currency_API_URL = "http://api.exchangeratesapi.io/v1/latest?access_key=a64c0344594dcaeed6fbaedf9706de61&amp;format=1";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  config: any;
  configUrl = 'assets/configConverterService.json';

  constructor(private http: HttpClient) {}

  // public get(url: string): Observable<any> {
  //   return this.http.get(API_URL + '/api/' + url).pipe(map((res) => res));
  // }

  public get():Observable<any> {
    return  this.http.get(Currency_API_URL).pipe(map((res) => res));
  }

}
// /api/users