import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DataPageComponent} from "./pages/data/components/data-page/data-page.component";
import {MonitorComponent} from "./pages/monitor/components/monitor/monitor.component";
import {AnalysisPageComponent} from "./pages/analysis/components/analysis-page/analysis-page.component";
import {StudentsGradesLoaded} from "./pages/analysis/load-students-grades.guard";
import {TraineeListLoaded} from "./pages/data/trainee-list-loaded.guard";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/data",
        pathMatch: "full"
    },
    {
        path: 'data',
        component: DataPageComponent,
        canActivate: [TraineeListLoaded]
    },
    {
        path: 'analysis',
        component: AnalysisPageComponent,
        canActivate: [StudentsGradesLoaded]
    },
    {
        path: 'monitor',
        component: MonitorComponent,
        canActivate: [StudentsGradesLoaded]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
