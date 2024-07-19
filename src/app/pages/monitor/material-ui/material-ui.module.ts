import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";

const materialUIModules = [
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule
];

@NgModule({
    imports: [
        CommonModule,
        ...materialUIModules
    ],
    exports: [
        ...materialUIModules
    ]
})
export class MaterialUiModule{

}
