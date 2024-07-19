import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {TraineeListService} from "./trainee-list.service";
import {selectTraineeListFilterState, TraineeFilterState} from "../store/trainee-filter/trainee-filter.reducer";
import {combineLatest, map, Observable, takeWhile, withLatestFrom} from "rxjs";
import {GradeDataItem} from "../models/trainee";
import {TraineeColumnName} from "../components/trainee-list-table/trainee-list-table.component";
import {ComparisonSign} from "../components/trainee-list-filter/trainee-list-filter.component";
import moment from "moment/moment";
import {setFilter} from "../store/trainee-filter/trainee-filter.actions";

interface Filter {

}

@Injectable()
export class TraineesGradesFilterService {
    #store = inject(Store);
    #traineeListService = inject(TraineeListService);

    getFilterState$() {
        return this.#store.select(selectTraineeListFilterState);
    }

    setFilterState(filterState: TraineeFilterState){
        this.#store.dispatch(setFilter({filterState}));
    }

    getFilteredGradesList$(): Observable<GradeDataItem[]> {
        return this.getFilterState$()
            .pipe(
                withLatestFrom(this.#traineeListService.getTraineeGradeList$()),
                map(([filter, traineesGrades]) => {
                    const {columnName, comparisonSign, dataType, comparableValue} = filter;
                    if (!columnName || !dataType || !comparisonSign || !comparableValue) return traineesGrades;
                    let filteredTraineesGrades: GradeDataItem[] = [];
                    switch (dataType) {
                        case 'number':
                            filteredTraineesGrades = this.#filterByNumber(traineesGrades, columnName as NonNullable<TraineeColumnName>, comparisonSign, comparableValue);
                            break;
                        case 'string':
                            filteredTraineesGrades = this.#filterByString(traineesGrades, columnName as NonNullable<TraineeColumnName>, comparisonSign, comparableValue);
                            break;
                        case 'date':
                            filteredTraineesGrades = this.#filterByDate(traineesGrades, columnName as NonNullable<TraineeColumnName>, comparisonSign, comparableValue);
                            break;

                    }
                    return filteredTraineesGrades
                })
            )
    }

    #filterByNumber(
        tableRow: GradeDataItem[],
        column: NonNullable<TraineeColumnName>,
        comparisonSign: NonNullable<ComparisonSign>,
        comparableValue: string): GradeDataItem[] {

        switch (comparisonSign) {
            case ">":
                return tableRow.filter(row => (row[column] as number) > +comparableValue);
            case "<":
                return tableRow.filter(row => (row[column] as number) < +comparableValue);
            case "=":
                return tableRow.filter(row => row[column] as number === +comparableValue);

        }

    }

    #filterByString(
        tableRow: GradeDataItem[],
        column: NonNullable<TraineeColumnName>,
        comparisonSign: NonNullable<ComparisonSign>,
        comparableValue: string): GradeDataItem[] {
        switch (comparisonSign) {
            case "=":
                return tableRow.filter(row => (row[column] as string).toLowerCase() === comparableValue.toLowerCase());
            default:
                return tableRow.filter(row => (row[column] as string).includes(comparableValue.toLowerCase()));
        }
    }

    #filterByDate(
        tableRow: GradeDataItem[],
        column: NonNullable<TraineeColumnName>,
        comparisonSign: NonNullable<ComparisonSign>,
        comparableValue: string): GradeDataItem[] {

        switch (comparisonSign) {
            case ">":
                return tableRow.filter(row => moment((row[column])).isAfter(comparableValue));
            case "<":
                return tableRow.filter(row => moment(row[column]).isBefore(comparableValue));
            case "=":
                return tableRow.filter(row => moment(row[column]).isSame(comparableValue));

        }

    }

}
