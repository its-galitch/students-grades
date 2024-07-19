import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {
    MonitorFilterState,
    selectFilteredStudents, selectMarkFailed, selectMarkPassed,
    selectMonitorFilterState
} from "../store/monitor-filter/monitor-filter.reducer";
import {
    initMonitorFilter,
    setIdsAndNameFilter,
    setMarkFailed,
    setMarkPassed
} from "../store/monitor-filter/monitor-filter.actions";
import {selectStudentsIds} from "../../analysis/store/students-grades/students-grades.reducer";
import {map, Observable, tap} from "rxjs";
import {ExamGrade} from "../../analysis/analysis-grades.service";

export interface StudentExamsAverage {
    id: number;
    name: string;
    average: number;
    exams: number;
}

@Injectable()
export class MonitorFiltersService {
    #store = inject(Store);


    getFilterState$() {
        return this.#store.select(selectMonitorFilterState);
    }

    getIsMarkPassed$() {
        return this.#store.select(selectMarkPassed);
    }

    getIsMarkFailed$(){
        return this.#store.select(selectMarkFailed);
    }

    initFilter(filterState: MonitorFilterState ) {
        this.#store.dispatch(initMonitorFilter({monitorFilter: filterState}));
    }

    setFilterFields({ids, nameFilter}:{ids: number[], nameFilter: string}) {
        this.#store.dispatch(setIdsAndNameFilter({ids, nameFilter}));
    }

    setMarkPassed(markPassed: boolean){
        this.#store.dispatch(setMarkPassed({markPassed}));
    }

    setMarkFailed(markFailed: boolean) {
        this.#store.dispatch(setMarkFailed({markFailed}));
    }

    getStudentsIds$() {
        return this.#store.select(selectStudentsIds);
    }

    getFilteredStudentsAvg$(): Observable<StudentExamsAverage[]> {
        return this.#store.select(selectFilteredStudents)
            .pipe(
                map(students=> {

                    return students.map(student => {
                        const studentExamsAvg: StudentExamsAverage = {
                            name: student.name,
                            id: student.id,
                            exams: student.grades.length,
                            average: this.#calculateGradesAvg(student.grades)
                        };
                        return studentExamsAvg;
                    })

                }),
            );
    }

    #calculateGradesAvg(exams: ExamGrade[]) {
        const examsGradesSum = exams
            .map(exam => exam.grade)
            .reduce((first, next) => first + next, 0);
        return Math.floor(examsGradesSum / exams.length);
    }
}
