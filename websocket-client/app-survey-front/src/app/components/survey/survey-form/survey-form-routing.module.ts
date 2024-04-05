import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SurveyFormComponent } from './survey-form.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'form', component: SurveyFormComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class SurveyFormsRoutingModule {}
