import { TableModule } from 'primeng/table';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
    imports: [
        DashboardsRoutingModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        ConfirmDialogModule,
    ],
    declarations: [DashboardComponent],
})
export class DashboardModule {}
