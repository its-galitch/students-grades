import {GradesSelector, StudentGrade} from "../../analysis-grades.service";
import {createFeature, createReducer, createSelector, on} from "@ngrx/store"
import * as StudentGradesActions from "./students-grades.actions";
import {studentsGrades} from "../../students-grades.data";
import {selectIds, selectSubjects} from "../analysis-selector/analysis-selector.reducer";
import {filterStudentGrades, selectAllSubjects, selectedGradesSubjects} from "./students-grades.selectors.util";

export const analysisFeatureKey = 'analysisData';

export interface StudentsGradesState {
    studentsGrades: StudentGrade[];
    isLoaded: boolean;

}

export const initialStudentsGradesState: StudentsGradesState = {
    studentsGrades: [],
    isLoaded: false

}

const analysisStateReducer = createReducer(
    initialStudentsGradesState,
    on(
        StudentGradesActions.initStudentsGrades,
        (state, {studentsGrades}) => ({
            isLoaded: true,
            studentsGrades: studentsGrades
        })
    )
);

export const studentsGradesFeature = createFeature({
    name: analysisFeatureKey,
    reducer: analysisStateReducer,
    extraSelectors: ({selectStudentsGrades}) =>
        (
            {
                selectStudentsIds: createSelector(
                    selectStudentsGrades,
                    (studentsGrades) =>
                        studentsGrades.map(student => student.id)
                ),

                selectGradesSubjects: createSelector(
                    selectStudentsGrades,
                    (studentsGrades) => selectAllSubjects(studentsGrades)

                ),

                selectStudentsByIds: createSelector(
                    selectStudentsGrades,
                    selectIds,
                    (students, ids) => filterStudentGrades(students, ids)
                ),

                selectGradesBySelector: createSelector(
                    selectStudentsGrades,
                    selectIds,
                    selectSubjects,
                    (students, ids, subjects) => {
                        const selectedByUserId = filterStudentGrades(students, ids);
                        return selectedGradesSubjects(selectedByUserId, subjects);
                    }
                )


            })
});

// @ts-ignore
export const {
    selectStudentsIds,
    selectStudentsGrades,
    selectIsLoaded,
    selectStudentsByIds,
    selectGradesBySelector,
    selectGradesSubjects,
} = studentsGradesFeature;


