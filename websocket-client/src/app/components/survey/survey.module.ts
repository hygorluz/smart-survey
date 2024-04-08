import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {TableModule} from "primeng/table";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {SurveyFormComponent} from "./survey-form/survey-form.component";
import {SurveyRoutingModule} from "./survey-routing.module";
import {SurveyListComponent} from "./survey-list/survey-list.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";

@NgModule({
    imports: [SurveyRoutingModule,
        CommonModule,
        FormsModule,
        CalendarModule,
        InputTextModule,
        ButtonModule,
        TableModule,
        ProgressSpinnerModule,
        ConfirmDialogModule,
        ToastModule, InputTextareaModule, RippleModule,
    ],
    declarations: [
        SurveyFormComponent,
        SurveyListComponent,
    ],
})
export class SurveyModule {}
