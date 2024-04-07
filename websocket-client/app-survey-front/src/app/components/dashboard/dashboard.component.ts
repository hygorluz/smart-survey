import {Component, OnInit} from '@angular/core';
import {Option, Survey} from "../../interfaces/Survey";
import {SurveyService} from "../services/SurveyService";
import {MessageService} from "primeng/api";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    isLoading = false;
    avaiableSurveys: Survey[];

    constructor(private surveyService: SurveyService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.loadSurveys();
    }

    onVote(survey: Survey, $event: Option) {
        console.log(survey, $event);
        this.surveyService.voteSurveyById(survey.id, $event.id).then(
            () => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Voto computado com sucesso'});
                this.loadSurveys();
            },
            error => {
                console.error(error);
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Erro ao computar voto'});
            });
    }

    private loadSurveys() {
        this.isLoading = true;
        this.surveyService.getSurveys().then(
            (surveys: Survey[]) => {
                this.avaiableSurveys = surveys.filter(survey => survey.expiresAt == null || new Date(survey.expiresAt) > new Date());
                console.log(this.avaiableSurveys);
                this.isLoading = false;
            },
            error => {
                console.error(error);
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Erro ao carregar enquetes'});
            });
    }
}
