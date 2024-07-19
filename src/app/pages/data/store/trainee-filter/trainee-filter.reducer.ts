import {ColumnDataType, ComparisonSign} from "../../components/trainee-list-filter/trainee-list-filter.component";
import {createFeature, createReducer, on} from "@ngrx/store";
import {setFilter} from "./trainee-filter.actions";

export interface TraineeFilterState {
    columnName: string | null;
    dataType: ColumnDataType | null;
    comparisonSign: ComparisonSign | null;
    comparableValue: string | null;
}

const initialState: TraineeFilterState = {
    columnName: null,
    dataType: null,
    comparisonSign: null,
    comparableValue: null
}

const traineeFilterReducer = createReducer<TraineeFilterState>(
    initialState,
    on(setFilter, (state, {filterState})=>({
        ...structuredClone(filterState)
    }))
);

export const traineeFilterFeature = createFeature({
    name: 'traineeListFilter',
    reducer: traineeFilterReducer
});


export const {
    selectColumnName,
    selectDataType,
    selectComparisonSign,
    selectComparableValue,
    selectTraineeListFilterState
} = traineeFilterFeature;
