import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { MatrixgridComponent } from './components/matrixgrid/matrixgrid.component';

@NgModule({
    declarations: [
        AppComponent,
        TutorialComponent,
        MatrixgridComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
