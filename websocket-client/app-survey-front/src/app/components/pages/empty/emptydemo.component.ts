import { Component } from '@angular/core';
import {SurveyService} from "../../services/SurveyService";

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent {

        constructor(private surveyService: SurveyService) {
        }

        ngOnInit() {
            this.surveyService.getSurveys().then((data) => {
                console.log(data);
            })
        }
}
