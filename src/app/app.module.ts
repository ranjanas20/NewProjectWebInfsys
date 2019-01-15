import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './home/faq/faq.component';
import { AddBugComponent } from './bug/add-bug/add-bug.component';
import { ViewBugsComponent } from './bug/view-bugs/view-bugs.component';
import { AppRouteModule } from './approute.module';
import { FooterComponent } from './home/footer/footer.component';
import { BugService } from './shared/services/bug.service';
import { MsgUtilComponent } from './util/msg-util/msg-util.component';
import { ProgressMaskComponent } from './util/progress-mask/progress-mask.component';
import { HttpClientModule } from '@angular/common/http';
import { TopBugsComponent } from './bug/top-bugs/top-bugs.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FaqComponent,
    AddBugComponent,
    ViewBugsComponent,
    FooterComponent,
    MsgUtilComponent,
    ProgressMaskComponent,
    TopBugsComponent
  ],
  imports: [
    BrowserModule, AppRouteModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [BugService],
  bootstrap: [AppComponent]
})
export class AppModule { }
