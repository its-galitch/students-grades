import {inject, Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {
    selectGradesBySelector, selectGradesSubjects,
    selectStudentsGrades,
    selectStudentsIds
} from "./store/students-grades/students-grades.reducer";
import {selectAnalysisSelectorState, selectSubjects} from "./store/analysis-selector/analysis-selector.reducer";
import {upsertSelector} from "./store/analysis-selector/analysis-selector.actions";

type StudySubject = 'algebra' | 'geography' | 'biology' | 'chemistry' | 'physics' | 'geometry';
type GradeDate = '2024-05-17' | '2024-05-21' | '2024-05-24' | '2024-05-03' | '2024-05-27' |
    '2024-06-02' | '2024-06-10' | '2024-06-13' | '2024-06-19' | '2024-06-23' | '2024-06-25' |
    '2024-07-03' | '2024-07-12' | '2024-07-18' | '2024-07-23' | '2024-07-27' | '2024-07-30';

export interface ExamGrade {
    grade: number;
    subject: StudySubject;
    date: GradeDate;
}

export interface StudentGrade {
    id: number;
    name: string;
    grades: ExamGrade[]
}

export interface GradesSelector {
    ids: number[] | null;
    subjects: string[] | null;
}

@Injectable()
export class AnalysisGradesService {


    #store = inject(Store);

    readonly #subjects = [
        'algebra', 'chemistry', 'biology', 'physics'
    ];

    getGradesSubjects$() {
        return this.#store.select(selectGradesSubjects);
    }

    getStudentsIds$(): Observable<number []> {
        return this.#store.select(selectStudentsIds);
    }

    getStudents$(): Observable<StudentGrade[]> {
        return this.#store.select(selectStudentsGrades);
    }

    updateGradesSelector(newSelectorValue: GradesSelector) {
        this.#store.dispatch(upsertSelector({selector: newSelectorValue}));
    }

    getSelector$(): Observable<GradesSelector> {
        return this.#store.select(selectAnalysisSelectorState);
    }

    getSelectedSubjects$() {
        return this.#store.select(selectSubjects);
    }

    getFilteredStudentsGrades$(): Observable<StudentGrade[]> {
        return this.#store.select(selectGradesBySelector);
    }

}
