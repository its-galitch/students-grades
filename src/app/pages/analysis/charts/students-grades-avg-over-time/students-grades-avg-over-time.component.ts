import {Component, inject} from '@angular/core';
import {StudentsGradeAverageOverTimeService} from './students-grades-avg-over-time.service';

@Component({
    selector: 'app-students-grades-avg-over-time',
    templateUrl: './students-grades-avg-over-time.component.html',
    styleUrl: './students-grades-avg-over-time.component.scss',
    providers: [
        StudentsGradeAverageOverTimeService
    ]
})
export class StudentsGradesAvgOverTimeComponent {
    #studentAvgOverTimeService = inject(StudentsGradeAverageOverTimeService);

    barChartData$ = this.#studentAvgOverTimeService.getChartData$();
    barChartOptions = this.#studentAvgOverTimeService.getBarChartOptions();
}
