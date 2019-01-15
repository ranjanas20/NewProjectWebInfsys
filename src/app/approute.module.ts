import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AddBugComponent } from './bug/add-bug/add-bug.component';
import { ViewBugsComponent } from './bug/view-bugs/view-bugs.component';


const appRoutes: Routes=[
  {path:'',  redirectTo: 'home',pathMatch:'full' },
  {path:'viewMilestones', component: HomeComponent },
  {path:'viewqa', component: HomeComponent  },
  {path: 'home', component: HomeComponent},
  {path:'bug/:mode/:id', component: AddBugComponent},
  {path:'bug/:mode', component: AddBugComponent},
  {path:'viewbugs', component: ViewBugsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true} )
  ],
  exports: [RouterModule]
})
export class AppRouteModule{

}
