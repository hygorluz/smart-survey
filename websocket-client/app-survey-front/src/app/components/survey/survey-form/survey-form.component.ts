import {Component, OnInit} from '@angular/core';
import {Option, Survey} from 'src/app/interfaces/Survey';
import {SurveyService} from "../../services/SurveyService";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
    templateUrl: './survey-form.component.html',
})
export class SurveyFormComponent implements OnInit {
    isEdit: boolean = false;
    isLoading: boolean = false;
    isSubmitted: boolean = false;
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
                private messageService: MessageService,
                private router: Router) {
    }

    ngOnInit() {
        // get survey id from route
        const id = this.router.url.split('/')[3];
        if (id) {
            this.isLoading = true;
            this.isEdit = true;
            this.surveyService.getSurveyById(id)
                .then((survey: Survey) => {
                    const timeString = survey.expiresAt;
                    const dateObject = new Date(timeString);
                    let newSurvey: any = JSON.parse(JSON.stringify(survey));
                    newSurvey.expiresAt = dateObject;
                    this.survey = newSurvey;
                    this.isLoading = false;
                })
        }
    }

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


    private saveSurvey() {
        this.surveyService.createSurvey(this.survey.title, this.survey.description, this.survey.expiresAt.toISOString(), this.survey.options)
            .then((survey) => {
                this.survey = null;
                this.router.navigate([`/survey`]);
            }, (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao criar enquete',
                });
            });
    }

    private updateSurvey() {
        // FIXME: devido a um bug no Apollo Client,
        //  é necessário remover os campos __typename,
        //  id e votes, pois o Apollo Client não consegue lidar com esses campos
        if (this.isEdit) {
            this.survey.options.forEach((option: any) => {
                delete option.__typename;
                delete option.id;
                delete option.votes;
            });
        }
        this.surveyService.updateSurveyById(this.survey.id, this.survey.title, this.survey.description, this.survey.expiresAt.toISOString())
            .then((survey) => {
                this.survey = null;
                this.router.navigate([`/survey`]);
            }, (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao atualizar enquete',
                });
            })
    }

    createOrUpdateSurvey() {
        this.isSubmitted = true;
        if (this.survey.title.trim() === '' ||
            this.survey.description.trim() === '' ||
            this.survey.expiresAt === null ||
            this.survey.options.length < 2) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: 'Preencha todos os campos',
            });
            return;
        }

        if (this.isEdit) {
            this.updateSurvey();
        } else {
            this.saveSurvey();
        }
    }

    removeOption(option: any) {
        this.survey.options = this.survey.options.filter((opt) => {
            if (opt.id) {
                return opt.id !== option.id;
            } else {
                return opt.title !== option.title;
            }
        });
    }
}
