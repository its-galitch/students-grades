import {GradesSelector} from "../../analysis-grades.service";
import {createFeature, createReducer, on} from "@ngrx/store";
import {upsertSelector} from "./analysis-selector.actions";

export const analysisSelectorFeatureKey = 'analysisSelector';

export interface AnalysisSelectorState extends GradesSelector {
}

const selectorInitialState: AnalysisSelectorState = {
    ids: null,
    subjects: null
}

const selectorReducer = createReducer(
    selectorInitialState,
    on(upsertSelector, (state, {selector}) =>({
        ...structuredClone(selector)
    }))
);

export const analysisSelectorFeature = createFeature({
    name: analysisSelectorFeatureKey,
    reducer: selectorReducer
})

export const {
    selectAnalysisSelectorState,
    selectIds,
    selectSubjects
} = analysisSelectorFeature;
