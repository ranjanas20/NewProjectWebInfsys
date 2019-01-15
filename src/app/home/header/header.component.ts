import { Component, OnInit } from '@angular/core';
import { BugService } from '../../shared/services/bug.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bugsCount: number =0;
  subscription: Subscription;
  
  constructor(private bugService: BugService) { }

  ngOnInit() {
    this.populateBugsCount();
    this.subscription = this.bugService.bugsCount.subscribe((bugsCount: number)=>{
      this.bugsCount = bugsCount;
    });
  }

  populateBugsCount() {
    this.bugService.getBugsCount().subscribe(
      (data: any) => {
        this.bugsCount = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
