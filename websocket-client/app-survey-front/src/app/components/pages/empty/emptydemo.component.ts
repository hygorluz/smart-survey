import {Component} from '@angular/core';
import {SurveyService} from "../../services/SurveyService";
import {Survey} from "../../../interfaces/Survey";

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent {

    surveys: Survey[] = [];

    constructor(private surveyService: SurveyService) {
    }

    ngOnInit() {
        this.surveyService.getSurveys().then(
            (data) => {
                this.surveys = data;
                console.log(data);
            });
    }
}
