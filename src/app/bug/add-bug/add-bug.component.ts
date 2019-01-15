import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BugModel } from '../../shared/model/bug.model';
import { BugService } from '../../shared/services/bug.service';
import { ResponseModel } from '../../shared/model/response.model';
import { StatusService } from '../../shared/services/status.service';
import { ImportanceService } from '../../shared/services/importance.service.';
import { StatusModel } from '../../shared/model/status.model';
import { ImportanceModel } from '../../shared/model/importance.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-bug',
  templateUrl: './add-bug.component.html',
  styleUrls: ['./add-bug.component.css']
})
export class AddBugComponent implements OnInit {
  mode: string = 'NEW';
  bugForm: FormGroup;
  bug: BugModel = new BugModel();

  statusList: Observable<StatusModel[]>;
  importanceList: Observable<ImportanceModel[]>;

  message: string = "";
  showMessage: boolean = false;
  showProgressBar: boolean = false;

  modeAddEditView: string = "";
  viewBugId: string = "";

  bugsCount: number;

  constructor(private bugService: BugService,
    private statusService: StatusService,
    private importanceService: ImportanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.showProgressBar = true;
    this.modeAddEditView = this.route.snapshot.paramMap.get('mode');
    this.loadStatusImportanceFromServer();
    this.initForms();
    this.showProgressBar = false;

    //display in VIEW Mode
    if (this.modeAddEditView == 'VIEW') {
      this.viewBugId = this.route.snapshot.paramMap.get('id');
      this.showProgressBar = true;
      this.bugService.getBug(Number(this.viewBugId)).subscribe(
        (resp: ResponseModel) => {
          this.bug = resp.data;
          this.showProgressBar = false;
          this.displayBugInView();
        },
        (error) => {
          console.log(error);
          this.showMessageNow("Error occured while saving Bug...");
          this.showProgressBar = false;
        }
      );
    }
  }

  initForms() {
    this.bugForm = new FormGroup({
      'id': new FormControl(''),
      'title': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      'description': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
      'status': new FormControl('NEW', [Validators.required]),
      'importance': new FormControl('', [Validators.required])
    });
  }

  get title() { return this.bugForm.get('title'); }
  get description() { return this.bugForm.get('description'); }
  get status() { return this.bugForm.get('status'); }
  get importance() { return this.bugForm.get('importance'); }

  loadStatusImportanceFromServer() {
    this.statusList = this.statusService.getStatus();
    this.importanceList = this.importanceService.getImportance();
  }

  resetFormBugForm() {
    this.bugForm.reset();
    this.bugForm.get('status').setValue('NEW');
  }

  populateBugModel() {
    this.bug.title = this.bugForm.get('title').value;
    this.bug.description = this.bugForm.get('description').value;
    this.bug.statusCode = this.bugForm.get('status').value;
    this.bug.importanceCode = this.bugForm.get('importance').value;
  }

  displayBugInView() {
    this.bugForm.get('id').setValue(this.bug.bugId);
    this.bugForm.get('title').setValue(this.bug.title);
    this.bugForm.get('description').setValue(this.bug.description);
    this.bugForm.get('status').setValue(this.bug.statusDescription);
    this.bugForm.get('importance').setValue(this.bug.statusDescription);
  }

  displayBugInEdit() {
    this.bugForm.get('title').setValue(this.bug.title);
    this.bugForm.get('description').setValue(this.bug.description);
    this.bugForm.get('status').setValue(this.bug.statusCode);
    this.bugForm.get('importance').setValue(this.bug.importanceCode);
  }

  showMessageNow(msg: string) {
    this.message = msg;
    this.showMessage = true;
  }

  onMessageHidden() {
    this.showMessage = false;
  }

  onSubmit(buttonPressed: string) {
    this.showProgressBar = true;
    this.populateBugModel();
    this.bugService.addBug(this.bug).subscribe(
      (resp: ResponseModel) => {
        this.bug = resp.data;
        if (buttonPressed != 'SaveNew') {
          this.modeAddEditView = 'VIEW';
          this.displayBugInView();
        } else {
          this.resetFormBugForm();
        }
        this.showMessageNow("Saved successfuly");
        this.populateBugsCount();
        this.showProgressBar = false;
      },
      (error) => {
        console.log(error);
        this.showMessageNow("Error occured while saving Bug...");
        this.showProgressBar = false;
      }
    );
  }

  populateBugsCount() {
    this.bugService.getBugsCount().subscribe(
      (data: any) => {
        this.bugsCount = data;
      },
      (error) => {
        console.log(error);
        this.showProgressBar = false;
      }
    );
  }

  onEditPressed() {
    this.modeAddEditView = 'EDIT';
    this.showMessage = false;
    this.displayBugInEdit();
  }
  onEditCancelPressed() {
    this.modeAddEditView = 'VIEW';
    this.displayBugInView();
  }
  onCancelPressed() {
    this.router.navigateByUrl('/home');
  }

  onUpdate() {
    this.showProgressBar = true;
    this.populateBugModel();
    this.bugService.updateBug(this.bug).subscribe(
      (resp: ResponseModel) => {
        this.bug = resp.data;
        this.resetFormBugForm();
        this.showMessageNow("Updated successfuly");
        this.populateBugsCount();
        this.modeAddEditView = 'ADD';
        this.showProgressBar = false;
      },
      (error) => {
        console.log(error);
        this.showMessageNow("Error occured while saving Bug...");
        this.showProgressBar = false;
      }
    );
  }
}
