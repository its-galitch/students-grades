import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TraineeListTableComponent} from "./components/trainee-list-table/trainee-list-table.component";
import {TraineeListFilterComponent} from "./components/trainee-list-filter/trainee-list-filter.component";
import {TraineeDetailsFormComponent} from "./components/trainee-details-form/trainee-details-form.component";
import {MaterialUiModule} from "./material-ui/material-ui.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DataPageComponent} from "./components/data-page/data-page.component";
import {StoreModule} from "@ngrx/store";
import {traineeFilterFeature} from "./store/trainee-filter/trainee-filter.reducer";
import {TraineeListService} from "./services/trainee-list.service";
import {TraineesGradesFilterService} from "./services/trainees-grades-filter.service";


@NgModule({
    declarations: [
        DataPageComponent,
        TraineeListTableComponent,
        TraineeListFilterComponent,
        TraineeDetailsFormComponent,
    ],
    providers: [
        TraineeListService,
        TraineesGradesFilterService
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        MaterialUiModule,
        ReactiveFormsModule,
        StoreModule.forFeature(traineeFilterFeature)
    ]
})
export class DataPageModule {
}
