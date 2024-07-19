import {Component, inject} from '@angular/core';
import {MonitorFiltersService} from "../../services/monitor-filters.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map, Observable, skipWhile, tap} from "rxjs";

@Component({
    selector: 'app-students-avg-list',
    templateUrl: './students-avg-list.component.html',
    styleUrl: './students-avg-list.component.scss'
})
export class StudentsAvgListComponent {

    #filterService = inject(MonitorFiltersService);
    studentsExamsAvg$ = this.#filterService
        .getFilteredStudentsAvg$()
        .pipe(takeUntilDestroyed());

    columnsToDisplay$: Observable<string[]> = this.studentsExamsAvg$.pipe(
        skipWhile(studentsExams => !(studentsExams || []).length),
        map(studentsExams => Object.keys(studentsExams[0]) || [])
    );

    isMarkPassed$ = this.#filterService.getIsMarkPassed$();
    isMarkFailed$ = this.#filterService.getIsMarkFailed$();



    setTableDisplayParams() {
        this.studentsExamsAvg$.pipe();
    }

}
