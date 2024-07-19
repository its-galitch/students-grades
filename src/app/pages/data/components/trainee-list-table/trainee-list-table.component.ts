import {AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GradeDataItem} from "../../models/trainee";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TraineeListService} from "../../services/trainee-list.service";
import {Subscription, tap} from "rxjs";
import {DataPageService} from "../../data-page.service";
import {TraineesGradesFilterService} from "../../services/trainees-grades-filter.service";

export type TraineeColumnName = "id"| "name"| "date" | "grade"|"subject"

@Component({
    selector: 'app-trainee-list-table',
    templateUrl: './trainee-list-table.component.html',
    styleUrl: './trainee-list-table.component.scss'
})
export class TraineeListTableComponent implements OnInit, OnDestroy, AfterViewInit {
    #traineesService = inject(TraineeListService);

    #filterService = inject(TraineesGradesFilterService);

    #dataPageService = inject(DataPageService);

    #subscription = new Subscription();

    gradesDataList: GradeDataItem[] = [];

    dataSource: MatTableDataSource<GradeDataItem> =new MatTableDataSource(this.gradesDataList);

    columnsToDisplay = this.#traineesService.getColumnsToDisplay();

    selectedRowId: number | undefined;

    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


    ngOnInit() {
        this.initDataSource();
        this.initSelectedRowId();
    }

    constructor() {

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator ?? null;
    }

    initDataSource() {
        // const sub = this.#traineesService.getTraineeGradeList$()
        const sub = this.#filterService.getFilteredGradesList$()
            .pipe(
                tap(grades => {
                    this.gradesDataList = grades;
                    this.dataSource.data = this.gradesDataList;
                })
            )
            .subscribe();

        this.#subscription.add(sub);
    }

    initSelectedRowId() {
        const sub = this.#dataPageService.getSelectedRow().pipe(
            tap(row => {
                this.selectedRowId = row ? row.id : undefined;
            })
        ).subscribe();
        this.#subscription.add(sub);
    }

    ngOnDestroy() {
        this.#subscription.unsubscribe();
    }

    onSelectRow(row: GradeDataItem) {
        if (row.id === this.selectedRowId) {
            this.#dataPageService.removeSelectedRow();
        } else {
            this.#dataPageService.setSelectedRow(row);
        }

    }
}
