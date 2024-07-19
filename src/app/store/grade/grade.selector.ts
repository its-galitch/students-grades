import {createFeatureSelector, createSelector} from "@ngrx/store";
import {allGrades, GradeState} from "./grade.reducer";
import {selectTraineeEntities} from "../trainee/trainee.selector";
import {Grade, GradeDataItem, GradeListItem} from "../../pages/data/models/trainee";
import {Features} from "../app.reducer";

const selectGradesState = createFeatureSelector<GradeState>(Features.grades);

export const selectAllGrades = createSelector(
    selectGradesState,
    allGrades
);

export const selectGradesWithTrainee = createSelector(
    selectAllGrades,
    selectTraineeEntities,
    (grades, traineeEntities) => {

        const gradeWithTrainee: GradeDataItem[] = [];
        for (let grade of grades) {
            let traineeDetails = traineeEntities[grade.traineeId];
            if (traineeDetails) {
                gradeWithTrainee.push({
                    ...traineeDetails,
                    ...grade,
                    isSelected: false
                });
            }
        }
        return gradeWithTrainee;
    }
);

export const selectTraineeGrades = (traineeId: number) => createSelector(
    selectAllGrades,
    (grades: Grade[]) => {
        return grades.filter(grade =>  grade.traineeId === traineeId)
    }
);

export const isLastTraineeGrade = (traineeId: number, gradeId: number) => createSelector(
    selectTraineeGrades(traineeId),
    grades => {
        const gradeFound = grades.findIndex(grade => grade.id === gradeId) >= 0;
        return gradeFound && grades.length === 1;
    }
);
