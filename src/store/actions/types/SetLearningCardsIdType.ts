import { SET_LEARNING_CARDS_ID } from 'store/actions/constants';

export type SetLearningCardsIdType = {
    type: typeof SET_LEARNING_CARDS_ID;
    payload: { cardsId: string[] };
};
