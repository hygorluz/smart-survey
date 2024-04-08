import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Survey} from 'src/app/interfaces/Survey';
import {Table} from 'primeng/table';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from "primeng/api";
import {SurveyService} from "../../services/SurveyService";

@Component({
    templateUrl: './survey-list.component.html',
})
export class SurveyListComponent implements OnInit {
    @ViewChild('dt1') table!: Table;
    surveys: Survey[] = [];
    loading: boolean = false;
    @ViewChild('filter') filter!: ElementRef;

    constructor(private surveyService: SurveyService,
                private router: Router,
                private messageService: MessageService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {
        // FIXME: devido ao cache do navegador, a página não é recarregada ao sair do formulário de enquete
        if (!localStorage.getItem('foo')) {
            localStorage.setItem('foo', 'no reload')
            location.reload();
        } else {
            localStorage.removeItem('foo')
        }
        if (!this.surveys.length) {
            this.getSurveys();
        }
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
                this.surveyService.deleteSurveyById(id).then(
                    () => {
                        this.surveys = this.surveys.filter(survey => survey.id !== id);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso !',
                            detail: 'Enquete Deletada',
                            life: 3000
                        });
                    }
                );
            }
        });
    }


    private getSurveys() {
        this.loading = true;
        this.surveyService.getSurveys().then(
            (data: any) => {
                if (!data) {
                    this.loading = false;
                    return;
                }
                this.surveys = new Array<Survey>();
                this.surveys = [...data];
                this.loading = false;
            },
            (error) => {
                this.loading = false;
                console.error(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao carregar enquetes',
                });
            }
        );
    }
}
