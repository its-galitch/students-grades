import {GradeDataItem} from "../../pages/data/models/trainee";
import {createReducer, on} from "@ngrx/store";
import * as DataPageActions from "./data-page.action";
import {FormMode} from "../../pages/data/components/trainee-details-form/form-state.enum";


export interface DataPageState{
    selectedRow: GradeDataItem | null;
    formMode: FormMode
}

const initialState = {
    selectedRow: null,
    formMode: FormMode.Unused
}


export const dataPageReducer = createReducer(
    initialState,

    on(DataPageActions.setSelectedRow, (state, {row})=> {
        return Object.assign({}, state, {selectedRow: row});
    }),
    on(DataPageActions.clearSelectedRow, (state) => {
        return Object.assign({}, state, {selectedRow: null});
    }),
    on(DataPageActions.setFormMode, (state, {formMode})=>{
        return Object.assign({}, state, { formMode : formMode })
    })
);
