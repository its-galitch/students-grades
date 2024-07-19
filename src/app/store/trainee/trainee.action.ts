import {createAction, props} from "@ngrx/store";
import {TraineeDetails} from "../../pages/data/models/trainee";
import {Update} from "@ngrx/entity";

export const addOne = createAction(
    '[Trainee] Add One',
    props<{ trainee: TraineeDetails }>()
);

export const removeOne = createAction(
    '[Trainee] Remove One',
    props<{ id: number }>()
);

export const updateOne = createAction(
    '[Trainee] Upsert One',
    props<{ updates: Update<TraineeDetails> }>()
);

export const addAll = createAction(
    '[Trainee] Add All',
    props<{ trainees: TraineeDetails[] }>()
);

export const loadAll = createAction(
    '[Trainee] Load All'
);

