import { SurveyFormComponent } from './survey-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SurveyFormsRoutingModule } from './survey-form-routing.module';
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SurveyFormsRoutingModule,
        CalendarModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        ProgressSpinnerModule,
    ],
    declarations: [SurveyFormComponent],
})
export class SurveyFormModule {}
