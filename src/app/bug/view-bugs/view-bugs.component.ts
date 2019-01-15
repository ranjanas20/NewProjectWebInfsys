import { Component, OnInit } from '@angular/core';
import { BugService } from '../../shared/services/bug.service';
import { BugModel } from '../../shared/model/bug.model';
import { BugsCountModel } from '../../shared/model/bugscount.model';

@Component({
  selector: 'app-view-bugs',
  templateUrl: './view-bugs.component.html',
  styleUrls: ['./view-bugs.component.css']
})
export class ViewBugsComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 5;
  pageArray: number[];
  sortField: string = 'bugId';
  sortOrder: string = 'ASC';

  bugs: BugModel[] = [];
  allbugsCount: BugsCountModel = new BugsCountModel();
  bugsCount: number = 0;

  showProgressBar: boolean = false;
  constructor(private bugService: BugService) { }

  ngOnInit() {
    this.loadBugsFromServer();
  }

  loadBugsFromServer() {
    this.showProgressBar = true;
    this.bugService.getBugsPagewise(this.currentPage, this.pageSize, this.sortField, this.sortOrder).subscribe(
      //this.bugService.getBugs().subscribe(
      (resp: any) => {
        this.bugs = resp.data;
        this.currentPage = resp.pageNumber;
        this.totalPages = resp.totalPages;
        this.setPageArray();
        this.populateAllTypeBugsCount();
      },
      (error) => {
        console.log(error);
        this.showProgressBar = false;
      }
    );
  }

  populateAllTypeBugsCount() {
    this.bugService.getAllBugsCount().subscribe(
      (data: any) => {
        this.allbugsCount = data;
        this.populateBugsCount();
      },
      (error) => {
        console.log(error);
        this.showProgressBar = false;
      }
    );
  }

  populateBugsCount() {
    this.bugService.getBugsCount().subscribe(
      (data: any) => {
        this.bugsCount = data;
        this.showProgressBar = false;
      },
      (error) => {
        console.log(error);
        this.showProgressBar = false;
      }
    );
  }
  delete(event:any,bugId:number){    
    this.bugService.deleteBug(bugId).subscribe(
      (data: any) => {
        this.loadBugsFromServer();
        this.showProgressBar = false;
      },
      (error) => {
        console.log(error);
        this.showProgressBar = false;
      }
    );
    event.preventDefault();

  }
  sort(event: any, field: string) {
    if (this.sortField === field) {
      if (this.sortOrder == 'ASC') {
        this.sortOrder = 'DESC';
      } else {
        this.sortOrder = 'ASC';
      }
    } else {
      this.sortField = field;
    }
    this.loadBugsFromServer();
    event.preventDefault();
  }

  gotoPage(event: any, newPage: number) {
    if (newPage != this.currentPage) {
      this.currentPage = newPage;
      this.loadBugsFromServer();
    }
    event.preventDefault();
  }

  previous(event: any) {
    if (this.currentPage != 1) {
      this.currentPage = this.currentPage - 1;
      this.loadBugsFromServer();
    }
    event.preventDefault();
  }

  next(event: any) {
    if (this.currentPage != this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.loadBugsFromServer();
    }
    event.preventDefault();
  }

  setPageArray() {
    this.pageArray = new Array();
    for (let i = 1; i <= this.totalPages; i++) {
      this.pageArray.push(i);
    }
  }

}
