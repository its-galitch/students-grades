import {createFeatureSelector, createSelector, props} from "@ngrx/store";
import {allTraineesList, traineeEntities, traineeIds, TraineeState} from "./trainee.reducer";
import {AppState, Features} from "../app.reducer";
import {Dictionary} from "@ngrx/entity";
import {TraineeDetails} from "../../pages/data/models/trainee";

export const selectTraineeState = createFeatureSelector<TraineeState>(Features.trainee);

export const selectAllTrainees = createSelector(
    selectTraineeState,
    allTraineesList
);

export const selectTraineeEntities = createSelector(
    selectTraineeState,
    traineeEntities
);

export const selectIds = createSelector(
    selectTraineeState,
    traineeIds
);

export const selectByIds = () => createSelector(
    selectTraineeEntities,
    (state: Dictionary<TraineeDetails> , props: {ids: number[]}) => {
        const traineeByIdsList: {id: number, name: string }[] = [];
        props.ids.forEach(id => {
            const trainee = state[id];
            if(trainee) {
                traineeByIdsList.push({id: trainee.id, name: trainee.name });
            }
        });
        return traineeByIdsList;
    }
);


export interface SelectAvgByIdArgs {
    traineeIds: number[];
    subjects: string[];
    result: {
        passed: boolean,
        notPassed: boolean
    }
}
