import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/main/app.component';
import {NgChartsModule} from "ng2-charts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './pages/main/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { DataPageComponent } from './pages/data/components/data-page/data-page.component';
import { AnalysisPageComponent } from './pages/analysis/components/analysis-page/analysis-page.component';
import { MonitorComponent } from './pages/monitor/components/monitor/monitor.component';
import { StoreModule } from '@ngrx/store';
import {appReducer} from "./store/app.reducer";
import { TraineeListTableComponent } from './pages/data/components/trainee-list-table/trainee-list-table.component';
import { TraineeListFilterComponent } from './pages/data/components/trainee-list-filter/trainee-list-filter.component';
import { TraineeDetailsFormComponent } from './pages/data/components/trainee-details-form/trainee-details-form.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { FiltersFormComponent } from './pages/monitor/components/filters-form/filters-form.component';
import { StudentsAvgListComponent } from './pages/monitor/components/students-avg-list/students-avg-list.component';
import {CdkDrag, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import { AnalysisChartsViewComponent } from './pages/analysis/components/analisys-charts-view/analysis-charts-view.component';
import { GradesAvgPrSubjectComponent } from './pages/analysis/charts/grades-avg-pr-subject/grades-avg-pr-subject.component';
import { StudentsGradesAvgOverTimeComponent } from './pages/analysis/charts/students-grades-avg-over-time/students-grades-avg-over-time.component';
import { StudentsAvgByIdsComponent } from './pages/analysis/charts/students-avg-by-ids/students-avg-by-ids.component';
import { StudentsGradesDataSelectorsComponent } from './pages/analysis/components/students-grades-data-selectors/students-grades-data-selectors.component';
import {DataPageModule} from "./pages/data/data-page.module";
import {AnalysisPageModule} from "./pages/analysis/analysis-page.module";
import {MonitorPageModule} from "./pages/monitor/monitor-page.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        StoreModule.forRoot(appReducer),
        StoreDevtoolsModule.instrument({
            maxAge: 30,
            logOnly: false,
            autoPause: true,
            features: {
                pause: false,
                lock: true,
                persist: true
            }
        }),
        ReactiveFormsModule,
        DataPageModule,
        AnalysisPageModule,
        MonitorPageModule,
        MatToolbarModule,
        MatButtonModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
