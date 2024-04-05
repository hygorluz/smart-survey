import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SurveyService } from '../services/SurveyService';
import { Survey } from 'src/app/interfaces/Survey';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    surveys: Survey[] = [];

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private surveyService: SurveyService, private router: Router) {}

    ngOnInit() {
        this.surveyService.getSurveys().then(
            (data: any) => {
                console.log(data);
                if (data && data.survey) {
                    this.loading = false;
                    this.surveys = data.survey;
                } else {
                    console.error('Dados inválidos recebidos do serviço.');
                }
            },
            (error) => {
                console.error('Erro ao buscar dados:', error);
            }
        );
    }

    navigateToSurveyCreate() {
        this.router.navigate([`survey/form`]);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}
