import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitorComponent} from "./components/monitor/monitor.component";
import {FiltersFormComponent} from "./components/filters-form/filters-form.component";
import {StoreModule} from "@ngrx/store";
import {monitorFilterFeature} from "./store/monitor-filter/monitor-filter.reducer";
import {MaterialUiModule} from "./material-ui/material-ui.module";
import {ReactiveFormsModule} from "@angular/forms";
import {StudentsAvgListComponent} from "./components/students-avg-list/students-avg-list.component";
import {MonitorFiltersService} from "./services/monitor-filters.service";


@NgModule({
    declarations: [
        MonitorComponent,
        FiltersFormComponent,
        StudentsAvgListComponent
    ],
    providers: [
        MonitorFiltersService
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialUiModule,
        StoreModule.forFeature(monitorFilterFeature),

    ]
})
export class MonitorPageModule {
}
