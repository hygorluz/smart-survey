import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Option, Survey} from "../../../interfaces/Survey";
import {MessageService} from "primeng/api";

@Component({
    selector: 'survey-card-votes',
    styleUrls: ['./survey.card.votes.component.scss'],
    templateUrl: './survey.card.votes.component.html',
})
export class SurveyCardVotesComponent {

    private _survey: Survey;
    totalVotes: number;
    Math = Math;
    voted = false;
    get survey(): Survey {
        return this._survey;
    }

    @Input()
    set survey(survey: Survey) {
        if (this._survey !== survey) {
            this._survey = survey;
            this.totalVotes = this.survey.options.reduce((acc, option) => acc + Number(option.votes), 0);
            console.log(this._survey);
        }
    }

    @Output()
    onVote: EventEmitter<Option> = new EventEmitter<Option>();


    constructor(private messageService: MessageService) {
    }

    calculatePercentage(option): any {
        if (this.totalVotes === 0) {
            return 0;
        }
        return ((option.votes / this.totalVotes) * 100).toFixed(2);
    }

    vote(id?: string, title?: string): void {
        if (!this.canVote()) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Enquete já votada'});
            return;
        }
        let option = this.survey.options.find(option => {
            if (id) {
                return option.id === id;
            } else {
                return null;
            }
        });
        if (!option) {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error submitting vote'});
            return;
        }
        this.voted = true;
        // set local storage to prevent voting again
        localStorage.setItem(this.survey.id, 'true');
        this.onVote.emit(option);
    }

    canVote(): boolean {
        return !this.voted && !localStorage.getItem(this.survey.id);
    }
}
