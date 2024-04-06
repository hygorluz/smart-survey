import { Component, OnInit, OnDestroy } from '@angular/core';
import { Option } from 'src/app/interfaces/Option';
import { Survey } from 'src/app/interfaces/Survey';
import {SurveyService} from "../../services/SurveyService";
import {Router} from "@angular/router";

@Component({
    templateUrl: './survey-form.component.html',
})
export class SurveyFormComponent implements OnInit {
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
}
