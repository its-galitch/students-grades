import {Component, inject, ViewChild} from '@angular/core';
import {AnalysisGradesService} from "../../analysis-grades.service";
import {StudentsAvgByIdsService} from "../students-avg-by-ids/students-avg-by-ids.service";
import {BaseChartDirective} from "ng2-charts";
import {GradesAvgPrSubjectService} from "./grades-avg-pr-subject.service";

@Component({
    selector: 'app-grades-avg-pr-subject',
    templateUrl: './grades-avg-pr-subject.component.html',
    styleUrl: './grades-avg-pr-subject.component.scss',
    providers: [
        GradesAvgPrSubjectService
    ]
})
export class GradesAvgPrSubjectComponent {
    analysisService = inject(AnalysisGradesService);
    #studentAvgByIdsService = inject(GradesAvgPrSubjectService);
    barChartData$ = this.#studentAvgByIdsService.getChartData$();
    barChartOptions = this.#studentAvgByIdsService.getBarChartOptions();

    @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
}
