import {
    removeCurrentIdFromIdListAC,
    setCurrentLearningCardIdAC,
    setLearningCardAC,
    setLearningCardsIdAC,
    setCardsFromPackAC,
} from 'store/actions/learnCards';

export type LearnCardsActionType =
    | ReturnType<typeof setLearningCardsIdAC>
    | ReturnType<typeof setCurrentLearningCardIdAC>
    | ReturnType<typeof removeCurrentIdFromIdListAC>
    | ReturnType<typeof setLearningCardAC>
    | ReturnType<typeof setCardsFromPackAC>;
