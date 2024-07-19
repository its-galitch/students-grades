import {Component, inject, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {AnalysisGradesService} from "../../analysis-grades.service";
import {StudentsAvgByIdsService} from "./students-avg-by-ids.service";

@Component({
  selector: 'app-students-avg-by-ids',
  templateUrl: './students-avg-by-ids.component.html',
  styleUrl: './students-avg-by-ids.component.scss',
    providers: [
        StudentsAvgByIdsService
    ]
})
export class StudentsAvgByIdsComponent {
    #analysisService = inject(AnalysisGradesService);
    #studentAvgByIdsService = inject(StudentsAvgByIdsService);
    barChartData$ = this.#studentAvgByIdsService.getChartData$();
    barChartOptions = this.#studentAvgByIdsService.getBarChartOptions();

    @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;


}
