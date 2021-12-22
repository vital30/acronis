import { Component, OnInit } from '@angular/core';
import { DatabaseBarService} from '../_services/database-bar.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieData:any;
  totalPages:any
  totalPagesArr:any
  currentPage:any
  totalPagesToShow:any
  total:any
  type:any
  private subject: Subject<string> = new Subject();

  constructor(private dbService: DatabaseBarService) { 
    this.subject.pipe(
      debounceTime(2000))
      .subscribe(model => {
        this.searchKey(model);
      });
  }

  ngOnInit(): void {
    this.getMovies();
  }

  onkeyUp(str:any, type:any){
    this.type = type;
    this.subject.next(str);
  }

  getMovies() {
    this.dbService.getMovies().subscribe(data => {
      this.movieData = data.data.results;
      this.total = data.data.total;
      this.totalPages = Math.round(data.data.total/data.data.limit);
      this.totalPagesArr = Array.from(Array(this.totalPages).keys());
      this.currentPage = 1;
      this.pagesToShow();

    },
    err => {
      throw err;
    });
  }

  getPage(offset:any){
    let limit=20;
    this.currentPage = offset;
    offset = offset*limit;
    this.dbService.getPage(limit, offset).subscribe(data => {
      this.movieData = data.data.results;
      this.pagesToShow();

    },
    err => {
      throw err;
    });
  }

  getNextPage(){
    let limit=20;
    let offset = this.currentPage+1;
    this.currentPage = offset;
    offset = offset*limit;
    this.pagesToShow();
    this.dbService.getNextPage(limit, offset).subscribe(data => {
      this.movieData = data.data.results;

    },
    err => {
      throw err;
    });
  }
  getPrevPage(){
    let limit=20;
    let offset = this.currentPage-1;
    this.currentPage = offset;
    offset = offset*limit;
    this.pagesToShow();
    this.dbService.getNextPage(limit, offset).subscribe(data => {
      this.movieData = data.data.results;

    },
    err => {
      throw err;
    });
  }

  searchKey(str:any){
        let limit=20;
        let offset=0;   
        if(this.type === "search"){
          this.dbService.searchKey(limit, offset, str).subscribe(data => {
            this.movieData = data.data.results;
            this.total = data.data.total;
            this.totalPagesToShow =[];
            this.totalPages = Math.round(data.data.total/data.data.limit);
            this.totalPagesArr = Array.from(Array(this.totalPages).keys());
          this.currentPage = 1;
          this.pagesToShow();
          },
          err => {
            throw err;
          });
        }
        if(this.type === "year"){
          this.dbService.searchByYear(limit, offset, str).subscribe(data => {
            this.movieData = data.data.results;
            this.total = data.data.total;
            this.totalPagesToShow =[];
            this.totalPages = Math.round(data.data.total/data.data.limit);
            this.totalPagesArr = Array.from(Array(this.totalPages).keys());
            this.currentPage = 1;
            this.pagesToShow();
          },
          err => {
            alert(err.error.status);
          });
        }

      }


  pagesToShow(){
    if(this.total < 20){
      this.totalPagesToShow =[this.currentPage];
      return;
    }
    if(this.currentPage === 1){
      this.totalPagesToShow =[this.currentPage,this.currentPage+1, this.currentPage+2, this.totalPages]
    }
    if(this.currentPage === 2){
      this.totalPagesToShow =[1, this.currentPage,this.currentPage+1, this.currentPage+2, this.totalPages]
    }
    if(this.currentPage === 3){
      this.totalPagesToShow =[1,this.currentPage-1, this.currentPage,this.currentPage+1, this.currentPage+2, this.totalPages]
    }
    if(this.currentPage >= 4){
      this.totalPagesToShow =[1,this.currentPage-2, this.currentPage-1, this.currentPage,this.currentPage+1, this.currentPage+2, this.totalPages]
    }

    if(this.currentPage === this.totalPages){
      this.totalPagesToShow =[1,this.currentPage-2, this.currentPage-1, this.currentPage]
    }
    if(this.currentPage === this.totalPages-1){
      this.totalPagesToShow =[1,this.currentPage-2, this.currentPage-1, this.currentPage,this.currentPage+1]
    }
    if(this.currentPage === this.totalPages-2){
      this.totalPagesToShow =[1,this.currentPage-2, this.currentPage-1, this.currentPage,this.currentPage+1, this.currentPage+2]
    }

  }

}
