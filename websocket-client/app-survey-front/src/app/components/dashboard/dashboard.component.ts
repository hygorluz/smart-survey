import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SurveyService} from '../services/SurveyService';
import {Survey} from 'src/app/interfaces/Survey';
import {Table} from 'primeng/table';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    surveys: Survey[] = [];

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    constructor(private surveyService: SurveyService,
                private router: Router,
                private messageService: MessageService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        this.surveyService.getSurveys().then(
            (data: any) => {
                if (data && data.survey) {
                    this.loading = false;
                    console.log(data.survey);
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

    navigateToSurveyEdit(id) {
        this.router.navigate([`survey/form/${id}`]);
    }

    deleteSurvey(id) {
        this.confirmationService.confirm({
            // colocar em portugues
            message: 'Você tem certeza que deseja excluir?',
            header: 'Excluir',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',

            accept: () => {
                console.log('Excluir');
                this.surveyService.deleteSurveyById(id).then(
                    () => {
                        this.surveys = this.surveys.filter(survey => survey.id !== id);
                        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Survey Deletada !', life: 3000});
                    }
                );
            }
        });
    }
}
