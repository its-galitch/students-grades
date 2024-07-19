import {createAction, props} from "@ngrx/store";
import {GradesSelector} from "../../analysis-grades.service";

export const upsertSelector = createAction(
    'upsertSelector',
    props<{ selector: GradesSelector }>()
)
