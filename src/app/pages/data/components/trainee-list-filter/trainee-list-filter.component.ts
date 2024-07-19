import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TraineeColumnName} from "../trainee-list-table/trainee-list-table.component";
import {TraineeListService} from "../../services/trainee-list.service";
import {TraineesGradesFilterService} from "../../services/trainees-grades-filter.service";
import {TraineeFilterState} from "../../store/trainee-filter/trainee-filter.reducer";

export type ComparisonSign = '>' | '<' | '=';
export type ColumnDataType = 'string' | 'number' | 'date';

@Component({
    selector: 'app-trainee-list-filter',
    templateUrl: './trainee-list-filter.component.html',
    styleUrl: './trainee-list-filter.component.scss'
})
export class TraineeListFilterComponent {
    #traineeService = inject(TraineeListService);
    #filterService = inject(TraineesGradesFilterService);

    columnNameControl: FormControl = new FormControl<TraineeColumnName|null>(null, { validators: [Validators.required]});
    comparisonSignControl = new FormControl<ComparisonSign|null>(null, {
        validators: [Validators.required]

    });
    comparableValueControl = new FormControl<null|string>(null, {validators: [Validators.required]});
    traineeFilterFormGroup = new FormGroup({
        columnName: this.columnNameControl,
        comparisonSign: this.comparisonSignControl,
        comparableValue: this.comparableValueControl
        });

    columnNames = this.#traineeService.getColumnsToDisplay();
    stringColumnNames = ['name','subject'];
    readonly comparisonSigns: ComparisonSign[] = ['>','=',"<"];
    readonly stringComparisonSigns = ['=', 'contains'];

    keyWordsDataTypes =
        new Map<TraineeColumnName, ColumnDataType>()
            .set('id', 'number')
            .set('name', 'string')
            .set('grade', 'number')
            .set('subject', 'string')
            .set('date', 'date');



    applyFilter() {
        const {columnName, comparisonSign, comparableValue} = this.traineeFilterFormGroup.value;
        const filterState: TraineeFilterState = {
            columnName: columnName,
            dataType: this.keyWordsDataTypes.get(columnName) || 'string',
            comparableValue: comparableValue || null,
            comparisonSign: comparisonSign || null
        };
        this.#filterService.setFilterState(filterState);
    }
}
