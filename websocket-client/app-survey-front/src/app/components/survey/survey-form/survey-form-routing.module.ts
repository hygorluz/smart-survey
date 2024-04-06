import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SurveyFormComponent } from './survey-form.component';
import {DashboardComponent} from "../../dashboard/dashboard.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'form', component: SurveyFormComponent },
            { path: 'form/:id', component: SurveyFormComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class SurveyFormsRoutingModule {}
