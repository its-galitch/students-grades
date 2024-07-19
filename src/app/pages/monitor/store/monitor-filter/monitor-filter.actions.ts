import {createAction, props} from "@ngrx/store";
import {MonitorFilterState} from "./monitor-filter.reducer";

export const initMonitorFilter = createAction(
    'init Monitor Filter',
    props<{monitorFilter: MonitorFilterState}>()
);

export const setIdsAndNameFilter = createAction(
    'set Ids and Name Filter',
    props<{ids:number[], nameFilter: string}>()
);

export const setMarkPassed = createAction(
    'set markPassed',
    props<{markPassed: boolean}>()
);

export const setMarkFailed = createAction(
    'set markFailed',
    props<{markFailed: boolean}>()
);
