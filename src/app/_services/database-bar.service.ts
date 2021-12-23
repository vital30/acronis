import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DatabaseBarService {
  constructor(private http: HttpClient) {}
  searchSub=""
  yearSub=""
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

  searchKey(limit:any, offset:any, search:any, year:any): Observable<any> {
    if(year){
      this.yearSub = "&startYear=" + year;
    }
    const url = DatabaseBarService.GET_URL_NEXT_PAGE+ "limit="+ limit + "&offset=" + offset + "&titleStartsWith=" + search + this.yearSub;
    return this.http.get(url);
  }

  searchByYear(limit:any, offset:any, year:any, search:any): Observable<any> {
    if(year){
      this.searchSub = "&titleStartsWith=" + search;
    }
    const url = DatabaseBarService.GET_URL_NEXT_PAGE+ "limit="+ limit + "&offset=" + offset + this.searchSub + "&startYear=" + year;
    return this.http.get(url);
  }


}