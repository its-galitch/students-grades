import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {debounceTime, distinctUntilChanged, first, tap} from "rxjs";
import {MonitorFiltersService} from "../../services/monitor-filters.service";

@Component({
    selector: 'app-filters-form',
    templateUrl: './filters-form.component.html',
    styleUrl: './filters-form.component.scss',

})
export class FiltersFormComponent implements OnInit {

    #monitorFiltersService = inject(MonitorFiltersService);
    markFailed = new FormControl<boolean>(false, {nonNullable: true});
    markFailedChanges$ = this.markFailed.valueChanges.pipe(takeUntilDestroyed());
    markPassed = new FormControl<boolean>(false, {nonNullable: true});
    markPassedChanges$ = this.markPassed.valueChanges.pipe(takeUntilDestroyed());

    filterFormGroup: FormGroup = new FormGroup({
        ids: new FormControl(),
        nameFilter: new FormControl(),
    });

    #filterValueChanges$ = this.filterFormGroup.valueChanges.pipe(takeUntilDestroyed());
    #filterValuesFromStore$ = this.#monitorFiltersService.getFilterState$().pipe(first());
    studentsIds$ = this.#monitorFiltersService.getStudentsIds$();

    ngOnInit() {
        this.#initFilterValuesFromStore();
        this.#updateFilterStoreOnChanges();
        this.#updateMarkGradeState();
    }

    #updateFilterStoreOnChanges() {
        this.#filterValueChanges$.pipe(
            debounceTime(500),
            distinctUntilChanged()
        ).subscribe(filterValues => {
            const {ids, nameFilter} = filterValues;
            this.#monitorFiltersService.setFilterFields({ids, nameFilter});
        });
    }

    #initFilterValuesFromStore() {
        this.#filterValuesFromStore$
            .pipe(
                tap(({ids, nameFilter, markPassed, markFailed}) => {
                    this.filterFormGroup.setValue({nameFilter, ids});
                    this.markFailed.setValue(markFailed);
                    this.markPassed.setValue(markPassed);
                })
            )
            .subscribe();
    }

    #updateMarkGradeState() {
        this.markFailedChanges$.pipe(
            tap(markFailed=> this.#monitorFiltersService.setMarkFailed(markFailed))
        ).subscribe();

        this.markPassedChanges$.pipe(
            tap(markPassed=> this.#monitorFiltersService.setMarkPassed(markPassed))
        ).subscribe();
    }

}
