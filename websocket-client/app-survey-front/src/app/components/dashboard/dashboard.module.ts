import { DashboardsRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {SurveyCardVotesComponent} from "./survey-card-votes/survey.card.votes.component";
import {ButtonModule} from "primeng/button";
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";

@NgModule({
    imports: [
        DashboardsRoutingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ButtonModule,
        CarouselModule,
        TagModule,
        ToastModule,
    ],
    declarations: [DashboardComponent, SurveyCardVotesComponent],
})
export class DashboardModule {}
