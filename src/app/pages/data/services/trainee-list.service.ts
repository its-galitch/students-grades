import {inject, Injectable, signal} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";
import * as TraineeActions from "../../../store/trainee/trainee.action";
import * as GradeActions from "../../../store/grade/grade.action";
import {grades, trainees} from "../../../store/trainee/trainee-init-list";
import {Observable} from "rxjs";
import {GradeDataItem} from "../models/trainee";
import {selectGradesWithTrainee} from "../../../store/grade/grade.selector";
import {TraineeColumnName} from "../components/trainee-list-table/trainee-list-table.component";

@Injectable()
export class TraineeListService {


    #store: Store<AppState> = inject(Store<AppState>);
    readonly #columnsToDisplay = signal<Array<TraineeColumnName>>(["id", "name", "date", "grade", "subject"])
        .asReadonly();

    getColumnsToDisplay() {
       return this.#columnsToDisplay;
    }


    loadInitTraineesData() {
        this.#store.dispatch(TraineeActions.addAll({trainees: trainees}));
        this.#store.dispatch(GradeActions.addAll({grades: grades}));
    }

    getTraineeGradeList$(): Observable<GradeDataItem[]> {
        return this.#store.select(selectGradesWithTrainee);
    }

}
