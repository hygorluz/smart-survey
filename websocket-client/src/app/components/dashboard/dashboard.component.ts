import {Component, OnInit} from '@angular/core';
import {Option, Survey} from "../../interfaces/Survey";
import {SurveyService} from "../services/SurveyService";
import {MessageService} from "primeng/api";
import {SocketService} from "../services/SocketService";
import {Socket} from "socket.io-client";

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    isLoading = false;
    avaiableSurveys: Survey[];
    private socket: Socket;

    constructor(private surveyService: SurveyService,
                private socketService: SocketService,
                private messageService: MessageService) {
        this.socket = this.socketService.getSocket();
    }

    ngOnInit(): void {
        this.isLoading = true;
        this.socket.on('surveys status', (data) => {
            this.isLoading = false;
            this.avaiableSurveys = this.filterSurveys(data);
        });
    }

    onVote(survey: Survey, $event: Option) {
        this.surveyService.voteSurveyById(survey.id, $event.id).then(
            () => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Voto computado com sucesso'});
                // location.reload();
                //load surveys again
                this.socket.emit('load surveys');
            },
            error => {
                console.error(error);
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Erro ao computar voto'});
            });
    }

    private loadSurveys() {

        // this.surveyService.getSurveys().then(
        //     (surveys: Survey[]) => {
        //         this.avaiableSurveys = surveys.filter(survey => survey.expiresAt == null || new Date(survey.expiresAt) > new Date());
        //         console.log(this.avaiableSurveys);
        //         this.isLoading = false;
        //     },
        //     error => {
        //         console.error(error);
        //         this.messageService.add({severity: 'error', summary: 'Error', detail: 'Erro ao carregar enquetes'});
        //     });
    }

    private filterSurveys(surveys: Survey[]): Survey[] {
        return surveys.filter(survey => survey.expiresAt == null || new Date(survey.expiresAt) > new Date());
    }
}
