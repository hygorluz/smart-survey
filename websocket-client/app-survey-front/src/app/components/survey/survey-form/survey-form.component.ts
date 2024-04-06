import { Component, OnInit, OnDestroy } from '@angular/core';
import { Option } from 'src/app/interfaces/Option';
import { Survey } from 'src/app/interfaces/Survey';
import {SurveyService} from "../../services/SurveyService";
import {Router} from "@angular/router";

@Component({
    templateUrl: './survey-form.component.html',
})
export class SurveyFormComponent implements OnInit {
    isEdit: boolean = false;
    survey: Survey = {
        id: '',
        expiresAt: null,
        description: '',
        createdAt: '',
        title: '',
        updatedAt: '',
        options: [],
    };
    constructor(private surveyService: SurveyService,
                private router: Router) {
        // get survey id from route
        const id = this.router.url.split('/')[3];
        if (id) {
            this.isEdit = true;
            this.surveyService.getSurveyById(id)
                .then((survey: Survey) => {
                    const timeString = survey.expiresAt;
                    const dateObject = new Date(timeString);
                    let newSurvey: any = JSON.parse(JSON.stringify(survey));
                    newSurvey.expiresAt = dateObject;
                    this.survey = newSurvey;
                })
        }
    }

    ngOnInit() {}

    newOption: string = '';

    addOption() {
        if (this.newOption.trim() !== '') {
            const newOption: Option = {
                title: this.newOption,
            };
            this.survey.options.push(newOption);
            this.newOption = '';
        }
    }

    saveSurvey() {
        this.surveyService.createSurvey(this.survey.title, this.survey.description, this.survey.expiresAt.toISOString(), this.survey.options)
            .then((survey) => {
                this.survey = null;
                this.router.navigate([`/`]);
            })
    }

    updateSurvey() {
        // FIXME: devido a um bug no Apollo Client,
        //  é necessário remover os campos __typename,
        //  id e votes, pois o Apollo Client não consegue lidar com esses campos

        this.survey.options.forEach((option: any) => {
            delete option.__typename;
            delete option.id;
            delete option.votes;
        });

        this.surveyService.updateSurveyById(this.survey.id, this.survey.title, this.survey.description, this.survey.expiresAt.toISOString(), this.survey.options)
            .then((survey) => {
                this.survey = null;
                this.router.navigate([`/`]);
            })
    }
}
