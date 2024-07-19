import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Grade} from "../../pages/data/models/trainee";
import {createReducer, on} from "@ngrx/store";
import * as GradesAction from "./grade.action";

export interface GradeState extends EntityState<Grade> {

}

function sortByDate(a: Grade, b: Grade) {
    return a.date.getTime() - b.date.getTime();
}
export const gradesEntityAdapter: EntityAdapter<Grade> = createEntityAdapter<Grade>({
    sortComparer: sortByDate
});

const initialState: GradeState = gradesEntityAdapter.getInitialState();

export const gradeReducer = createReducer(
    initialState,
    on(GradesAction.addAll, (state, { grades}) => gradesEntityAdapter.upsertMany(grades, state)),
    on(GradesAction.updateOne, (state, {updates}) => gradesEntityAdapter.updateOne(updates, state)),
    on(GradesAction.addOne, (state, {grade}) => gradesEntityAdapter.addOne(grade, state)),
    on(GradesAction.removeOne, (state, {id}) => gradesEntityAdapter.removeOne(id, state))

);

const { selectAll, selectEntities } = gradesEntityAdapter.getSelectors();

export const allGrades = selectAll;
