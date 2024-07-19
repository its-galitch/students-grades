import {TraineeDetails} from "../../pages/data/models/trainee";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import * as TraineeActions from "./trainee.action";

export interface TraineeState extends EntityState<TraineeDetails> {
    selectedTraineeId: number | null;

}

export const traineeEntityAdapter: EntityAdapter<TraineeDetails> = createEntityAdapter<TraineeDetails>({});


const initialState: TraineeState = traineeEntityAdapter.getInitialState({
    selectedTraineeId: null

});

export const traineeReducer = createReducer(
    initialState,
    on(TraineeActions.addOne, (state, { trainee } )=> traineeEntityAdapter.addOne(trainee, state)),
    on(TraineeActions.removeOne, (state, { id })=> traineeEntityAdapter.removeOne(id, state)),
    on(TraineeActions.updateOne, (state, {  updates })=> traineeEntityAdapter.updateOne(updates, state)),
    on(TraineeActions.addAll, (state, { trainees })=> traineeEntityAdapter.upsertMany(trainees, state))
);

const { selectAll, selectEntities, selectIds } = traineeEntityAdapter.getSelectors();

export const allTraineesList = selectAll;
export const traineeEntities = selectEntities;

export const traineeIds = selectIds;

