import {createFeature, createReducer, createSelector, on} from "@ngrx/store";
import {initMonitorFilter, setIdsAndNameFilter, setMarkFailed, setMarkPassed} from "./monitor-filter.actions";
import {selectStudentsGrades} from "../../../analysis/store/students-grades/students-grades.reducer";
import * as filterSelectorUtils from './monitor.filter.selectors.utils';

export interface MonitorFilterState {
    ids: number[];
    nameFilter: string;
    markPassed: boolean;
    markFailed: boolean;
}

const initialMonitorFilterState: MonitorFilterState = {
    ids: [],
    nameFilter: '',
    markPassed: true,
    markFailed: true
}


const monitorFilterReducer = createReducer(
    initialMonitorFilterState,
    on(initMonitorFilter, (state, {monitorFilter})=> structuredClone(monitorFilter) ),
    on(setIdsAndNameFilter, (state, {ids, nameFilter})=> ({
        ...state,
        ids,
        nameFilter
    })),
    on(setMarkFailed, (state, {markFailed})=> ({
        ...state,
        markFailed
    })),
    on(setMarkPassed, (state, {markPassed})=> ({
        ...state,
        markPassed
    }))

);

export const monitorFilterFeature = createFeature({
    name: 'monitorFilter',
    reducer: monitorFilterReducer,
    extraSelectors: ({selectIds, selectNameFilter}) => ({
        selectFilteredStudents: createSelector(
            selectStudentsGrades,
            selectIds,
            selectNameFilter,
            (students, ids, nameFilter) =>
                filterSelectorUtils.getFilteredStudents(students, ids, nameFilter)
        )

    })
});

export const {
    selectIds,
    selectNameFilter,
    selectMarkFailed,
    selectMarkPassed,
    selectMonitorFilterState,
    selectFilteredStudents
} = monitorFilterFeature;
