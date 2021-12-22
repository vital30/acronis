import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DatabaseBarService {
  constructor(private http: HttpClient) {}

  static  GET_URL = "https://gateway.marvel.com/v1/public/comics?apikey=1bf0a3a55fc46c79fbf4399cf97700e6"; 
  static  GET_URL_NEXT_PAGE = "https://gateway.marvel.com/v1/public/comics?apikey=1bf0a3a55fc46c79fbf4399cf97700e6&"
  getMovies(): Observable<any> {
    const url = DatabaseBarService.GET_URL;
    return this.http.get(url);
  }
  getPage(limit:any, offset:any): Observable<any> {
    const url = DatabaseBarService.GET_URL_NEXT_PAGE+ "limit="+ limit + "&offset=" + offset;
    return this.http.get(url);
  }

  getPrevPage(limit:any, offset:any): Observable<any> {
    const url = DatabaseBarService.GET_URL_NEXT_PAGE+ "limit="+ limit + "&offset=" + offset;
    return this.http.get(url);
  }

  getNextPage(limit:any, offset:any): Observable<any> {
    const url = DatabaseBarService.GET_URL_NEXT_PAGE+ "limit="+ limit + "&offset=" + offset;
    return this.http.get(url);
  }

  searchKey(limit:any, offset:any, str:any): Observable<any> {
    const url = DatabaseBarService.GET_URL_NEXT_PAGE+ "limit="+ limit + "&offset=" + offset + "&titleStartsWith=" + str;
    return this.http.get(url);
  }

  searchByYear(limit:any, offset:any, year:any): Observable<any> {
    const url = DatabaseBarService.GET_URL_NEXT_PAGE+ "limit="+ limit + "&offset=" + offset + "&startYear=" + year;
    return this.http.get(url);
  }


}