import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './components/notfound/notfound.component';
import {SurveyService} from "./components/services/SurveyService";
import {ConfirmationService, MessageService} from "primeng/api";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        SurveyService,
        ConfirmationService,
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
