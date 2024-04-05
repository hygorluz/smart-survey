import { Component, OnInit, OnDestroy } from '@angular/core';
import { Option } from 'src/app/interfaces/Option';
import { Survey } from 'src/app/interfaces/Survey';

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
    constructor() {}

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
        console.log(this.survey);
    }
}
