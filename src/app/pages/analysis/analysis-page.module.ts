import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnalysisPageComponent} from "./components/analysis-page/analysis-page.component";
import {AnalysisChartsViewComponent} from "./components/analisys-charts-view/analysis-charts-view.component";
import {GradesAvgPrSubjectComponent} from "./charts/grades-avg-pr-subject/grades-avg-pr-subject.component";
import {
    StudentsGradesAvgOverTimeComponent
} from "./charts/students-grades-avg-over-time/students-grades-avg-over-time.component";
import {StudentsAvgByIdsComponent} from "./charts/students-avg-by-ids/students-avg-by-ids.component";
import {
    StudentsGradesDataSelectorsComponent
} from "./components/students-grades-data-selectors/students-grades-data-selectors.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AnalysisGradesService} from "./analysis-grades.service";
import {NgChartsModule} from "ng2-charts";
import {MaterialUiModule} from "./material-ui/material-ui.module";
import {StoreModule} from "@ngrx/store";
import {studentsGradesFeature} from "./store/students-grades/students-grades.reducer";
import {analysisSelectorFeature} from "./store/analysis-selector/analysis-selector.reducer";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        AnalysisPageComponent,
        AnalysisChartsViewComponent,
        GradesAvgPrSubjectComponent,
        StudentsGradesAvgOverTimeComponent,
        StudentsAvgByIdsComponent,
        StudentsGradesDataSelectorsComponent,
    ],

    imports: [
        CommonModule,
        MaterialUiModule,
        ReactiveFormsModule,
        NgChartsModule,
        StoreModule.forFeature(studentsGradesFeature),
        StoreModule.forFeature(analysisSelectorFeature),
        MatButtonModule
    ],
    providers: [
        AnalysisGradesService
    ]
})
export class AnalysisPageModule {
}
