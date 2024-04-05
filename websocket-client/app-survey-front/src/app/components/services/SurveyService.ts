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
                uri: 'http://localhost:4000/',
            }),
            cache: new InMemoryCache(),
        });
    }

    async getSurveys(): Promise<{ survey: Survey }> {
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

            return result.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async createSurvey(input: {
        title: string,
        description: string,
        expiresAt: string,
        options: { title: string, votes: number }[]
    }): Promise<Survey> {
        try {
            const result = await this.apolloClient.mutate({
                mutation: gql`
          mutation CreateSurvey($input: SurveyInput!) {
            createSurvey(input: $input) {
              createdAt
              description
              expiresAt
              id
              options {
                id
                votes
                title
              }
              title
              updatedAt
            }
          }
        `,
                variables: {input},
            });

            return result.data.createSurvey;
        } catch (error) {
            console.error('Error creating survey:', error);
            throw error;
        }
    }

    async updateSurveyById(input: {
        id: string,
        title: string,
        description: string,
        expiresAt: string,
        options: { id: string, title: string, votes: number }[]
    }): Promise<Survey> {
        try {
            const result = await this.apolloClient.mutate({
                mutation: gql`
          mutation UpdateSurveyById($input: UpdateSurveyInput!) {
            updateSurveyById(input: $input) {
              createdAt
              description
              expiresAt
              id
              options {
                id
                title
                votes
              }
              title
              updatedAt
            }
          }
        `,
                variables: { input },
            });

            return result.data.updateSurveyById;
        } catch (error) {
            console.error('Error updating survey:', error);
            throw error;
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

}
