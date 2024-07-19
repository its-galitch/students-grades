import {createAction, props} from "@ngrx/store";
import {TraineeFilterState} from "./trainee-filter.reducer";

export const setFilter = createAction(
    'Set Trainee List Filter',
    props<{filterState: TraineeFilterState}>()
);
