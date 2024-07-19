import {createAction, props} from "@ngrx/store";
import {StudentGrade} from "../../analysis-grades.service";

export const initStudentsGrades = createAction(
    'initStudentsGrades',
    props<{studentsGrades: Array<StudentGrade>}>()
);
