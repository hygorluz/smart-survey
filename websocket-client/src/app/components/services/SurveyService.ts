import {Injectable} from '@angular/core';
import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client/core';
import {gql} from '@apollo/client/core';
import {Survey} from "../../interfaces/Survey";

@Injectable({
    providedIn: 'root',
})
export class SurveyService {
    private apolloClient: ApolloClient<unknown>;

    constructor() {
        this.apolloClient = new ApolloClient({
            link: new HttpLink({
                uri: 'https://graphql-api-silk.vercel.app/',
            }),
            cache: new InMemoryCache(),
        });
    }

    async getSurveys(): Promise<Survey[]> {

        try {
            const result = await this.apolloClient.query({
                query: gql`
                    query {
                        survey {
                            id
                            expiresAt
                            description
                            createdAt
                            title
                            updatedAt
                            options {
                                id
                                title
                                votes
                            }
                        }
                    }
                `,
            });

            return result.data.survey;
        } catch (error) {
            console.error('Error fetching surveys:', error);
            throw error;
        }
    }

    async getSurveyById(id: string): Promise<Survey> {
        try {
            const result = await this.apolloClient.query({
                query: gql`
                    query GetSurveyById($id: String!) {
                        getSurveyById(id: $id) {
                            id
                            expiresAt
                            description
                            createdAt
                            title
                            updatedAt
                            options {
                                id
                                title
                                votes
                            }
                        }
                    }
                `,
                variables: { id },
            });

            return result.data.getSurveyById;
        } catch (error) {
            console.error(`Error fetching survey with ID ${id}:`, error);
            throw error;
        }
    }

    async createSurvey(title: string, description: string, expiresAt: string, options: { id?: string, title: string, votes?: number }[]): Promise<Survey> {
        try {
            const result = await this.apolloClient.mutate({
                mutation: gql`
                    mutation CreateSurvey($title: String!, $description: String!, $expiresAt: String!, $options: [OptionInput]!) {
                        createSurvey(title: $title, description: $description, expiresAt: $expiresAt, options: $options) {
                            id
                            expiresAt
                            description
                            createdAt
                            title
                            updatedAt
                            options {
                                id
                                title
                                votes
                            }
                        }
                    }
                `,
                variables: { title, description, expiresAt, options },
            });

            return result.data.createSurvey;
        } catch (error) {
            console.error('Error creating survey:', error);
            throw error;
        }
    }


    async createOrUpdateSurvey(id?: string, title?: string, description?: string, expiresAt?: string, options?: { id?: string, title: string, votes?: number }[]): Promise<Survey> {
        if (id) {
            return this.updateSurveyById(id, title, description, expiresAt, options);
        } else {
            return this.createSurvey(title, description, expiresAt, options);
        }
    }

    async deleteSurveyById(id: string): Promise<void> {
        try {
            await this.apolloClient.mutate({
                mutation: gql`
          mutation DeleteSurveyById($id: String!) {
            deleteSurveyById(id: $id)
          }
        `,
                variables: { id },
            });
        } catch (error) {
            console.error('Error deleting survey:', error);
            throw error;
        }
    }

    async updateSurveyById(id: string, title: string, description: string, expiresAt: string, options?: { title: string }[]): Promise<Survey> {
        try {
            const result = await this.apolloClient.mutate({
                mutation: gql`
                    mutation UpdateSurveyById($id: String!, $title: String!, $description: String!, $expiresAt: String!, $options: [OptionInput]!) {
                        updateSurveyById(id: $id, title: $title, description: $description, expiresAt: $expiresAt, options: $options) {
                            id
                            expiresAt
                            description
                            createdAt
                            title
                            updatedAt
                            options {
                                id
                                title
                                votes
                            }
                        }
                    }
                `,
                variables: { id, title, description, expiresAt, options },
            });

            return result.data.updateSurveyById;
        } catch (error) {
            console.error('Error updating survey:', error);
            throw error;
        }
    }

    async voteSurveyById(surveyId: string, optionId: string): Promise<Survey> {
        try {
            const result = await this.apolloClient.mutate({
                mutation: gql`
                mutation VoteSurveyById($surveyId: String!, $optionId: String!) {
                    voteSurveyById(id: $surveyId, optionId: $optionId) {
                        id
                        expiresAt
                        description
                        createdAt
                        title
                        updatedAt
                        options {
                            id
                            title
                            votes
                        }
                    }
                }
            `,
                variables: {surveyId, optionId},
            });

            return result.data.voteSurveyById;
        } catch (error) {
            console.error('Error voting on survey:', error);
            throw error;
        }
    }
}
