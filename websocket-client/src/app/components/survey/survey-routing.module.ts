import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SurveyFormComponent} from "./survey-form/survey-form.component";
import {SurveyListComponent} from "./survey-list/survey-list.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: SurveyListComponent },
            { path: 'form', component: SurveyFormComponent },
            { path: 'form/:id', component: SurveyFormComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class SurveyRoutingModule {}
