import { Component, OnInit } from '@angular/core';
import { BugService } from '../../shared/services/bug.service';
import { BugModel } from '../../shared/model/bug.model';

@Component({
  selector: 'app-top-bugs',
  templateUrl: './top-bugs.component.html',
  styleUrls: ['./top-bugs.component.css']
})
export class TopBugsComponent implements OnInit {
  bugs: BugModel[] = [];

  constructor(private bugService: BugService) { }

  ngOnInit() {
    this.bugService.getBugsPagewise(1, 5, 'bugId', 'DESC').subscribe(
      (resp: any) => {
        this.bugs = resp.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
