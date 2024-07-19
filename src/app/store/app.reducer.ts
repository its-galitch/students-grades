import {traineeReducer, TraineeState} from "./trainee/trainee.reducer";
import {gradeReducer, GradeState} from "./grade/grade.reducer";
import {dataPageReducer, DataPageState} from "./data-page/data-page.reducer";

export enum Features {
    trainee = 'trainee',
    grades = 'grades',
    dataPage = 'dataPage'
}
export interface AppState {
    [Features.trainee]: TraineeState;
    [Features.grades]: GradeState;
    [Features.dataPage]: DataPageState;
}

export const appReducer = {
    [Features.trainee]: traineeReducer,
    [Features.grades]: gradeReducer,
    [Features.dataPage]: dataPageReducer
}
