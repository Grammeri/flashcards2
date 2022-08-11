import { LearnCardType } from 'api/types/cards/GetCardType/GetCardsType';
import { SET_LEARNING_CARD } from 'store/actions/constants';

export type SetLearningCardType = {
    type: typeof SET_LEARNING_CARD;
    payload: { card: LearnCardType };
};
