import { CardsType, LearnCardType } from 'api/types/cards/GetCardType/GetCardsType';
import {
    REMOVE_CURRENT_ID_FROM_ID_LIST,
    SET_CARDS_FROM_PACK,
    SET_CURRENT_LEARNING_CARDS_ID,
    SET_LEARNING_CARD,
    SET_LEARNING_CARDS_ID,
} from 'store/actions/constants';
import {
    RemoveCurrentIdFromIdListType,
    SetCardsFromPackType,
    SetCurrentIdType,
    SetLearningCardsIdType,
    SetLearningCardType,
} from 'store/actions/types';

export const setLearningCardsIdAC = (cardsId: string[]): SetLearningCardsIdType => {
    return {
        type: SET_LEARNING_CARDS_ID,
        payload: { cardsId },
    };
};

export const setLearningCardAC = (card: LearnCardType): SetLearningCardType => {
    return {
        type: SET_LEARNING_CARD,
        payload: { card },
    };
};

export const setCurrentLearningCardIdAC = (currentCardId: string): SetCurrentIdType => {
    return {
        type: SET_CURRENT_LEARNING_CARDS_ID,
        payload: { currentCardId },
    };
};

export const removeCurrentIdFromIdListAC = (
    currentCardId: string,
): RemoveCurrentIdFromIdListType => {
    return {
        type: REMOVE_CURRENT_ID_FROM_ID_LIST,
        payload: { currentCardId },
    };
};

export const setCardsFromPackAC = (cards: CardsType[]): SetCardsFromPackType => {
    return {
        type: SET_CARDS_FROM_PACK,
        payload: { cards },
    };
};
