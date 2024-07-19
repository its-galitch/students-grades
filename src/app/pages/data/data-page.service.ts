import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {Grade, GradeDataItem, TraineeDetails} from "./models/trainee";
import {first, Observable, take, tap} from "rxjs";
import {selectFormState, selectSelectedRow} from "../../store/data-page/data-page.selector";
import * as GradeActions from "../../store/grade/grade.action";
import * as TraineeActions from "../../store/trainee/trainee.action";
import * as DataPageActions from "../../store/data-page/data-page.action";
import {FormMode} from "./components/trainee-details-form/form-state.enum";
import {isLastTraineeGrade} from "../../store/grade/grade.selector";

@Injectable()
export class DataPageService {

    private store = inject<Store<AppState>>(Store);

    setSelectedRow(row: GradeDataItem) {
        this.store.dispatch(DataPageActions.setSelectedRow({row}));
    }

    removeSelectedRow() {
        this.store.dispatch(DataPageActions.clearSelectedRow());
    }

    getSelectedRow(): Observable<GradeDataItem | null> {
        return this.store.select(selectSelectedRow);
    }

    getFormMode(): Observable<FormMode> {
        return this.store.select(selectFormState);
    }

    changeFormMode(formMode: FormMode) {
        this.store.dispatch(DataPageActions.setFormMode({formMode: formMode}))
    }

    updateGrade(grade: Grade) {
        this.store.dispatch(GradeActions.updateOne({
            updates: {
                id: grade.id,
                changes: grade
            }
        }))
    }

    updateTrainee(traineeToSave: TraineeDetails) {
        this.store.dispatch(TraineeActions.updateOne(
            {
                updates:
                    {
                        id: traineeToSave.id,
                        changes: traineeToSave
                    }
            }));
    }

    addTraineeDetails(traineeDetails: TraineeDetails) {
        this.store.dispatch(TraineeActions.addOne({trainee: traineeDetails}));
    }

    addGrade(grade: Grade) {
        this.store.dispatch(GradeActions.addOne({grade}));
    }

    removeTraineeDetails(gradeId: number, traineeId: number) {
        this.store.select(isLastTraineeGrade(traineeId, gradeId)).pipe(
            first(),
            tap(isLastTraineeGrade => {

                if(isLastTraineeGrade) {
                    this.store.dispatch(TraineeActions.removeOne({id: traineeId}));
                }
                this.store.dispatch(GradeActions.removeOne({id: gradeId}));
                this.removeSelectedRow()
            })

        ).subscribe();
    }


}
