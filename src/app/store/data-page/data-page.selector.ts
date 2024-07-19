import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Features} from "../app.reducer";
import {DataPageState} from "./data-page.reducer";
import {GradeDataItem} from "../../pages/data/models/trainee";

export const selectDataPageState = createFeatureSelector<DataPageState>(Features.dataPage);

export const selectSelectedRow = createSelector(
    selectDataPageState,
    state => state.selectedRow
);

export const selectFormState  = createSelector(
    selectDataPageState,
    state => state.formMode
)
