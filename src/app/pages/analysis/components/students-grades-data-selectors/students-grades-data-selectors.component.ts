import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AnalysisGradesService} from "../../analysis-grades.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {first, take, tap} from "rxjs";

@Component({
    selector: 'app-students-grades-data-selectors',
    templateUrl: './students-grades-data-selectors.component.html',
    styleUrl: './students-grades-data-selectors.component.scss'
})
export class StudentsGradesDataSelectorsComponent implements OnInit {
    #analysisService = inject(AnalysisGradesService);
    readonly studentsIds$ = this.#analysisService.getStudentsIds$();
    readonly subjects$ = this.#analysisService.getGradesSubjects$();

    selectorsFormGroup: FormGroup = this.#createFormGroup();
    selectorValueChanges$ = this.selectorsFormGroup.valueChanges.pipe(takeUntilDestroyed());
    selectorFromStore$ = this.#analysisService.getSelector$().pipe(takeUntilDestroyed());

    #createFormGroup(): FormGroup {
        return new FormGroup({
            ids: new FormControl(''),
            subjects: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.#setSelectorStateFromStore();
        this.#updateGradesSelector();
    }

    #updateGradesSelector() {
        this.selectorValueChanges$.pipe(
            tap(
                value => this.#analysisService.updateGradesSelector(value)
            )
        ).subscribe();
    }

    #setSelectorStateFromStore() {
        this.selectorFromStore$.
            pipe(
                first()
        )
            .subscribe(
            value => {
                this.selectorsFormGroup.setValue(value);
            }
        );
    }
}
