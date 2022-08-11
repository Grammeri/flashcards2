import { SET_LEARNING_CARDS_ID } from 'store/actions/constants';
import { SetLearningCardsIdType } from 'store/actions/types';

export const setLearningCardsIdAC = (cardsId: string[]): SetLearningCardsIdType => {
    return {
        type: SET_LEARNING_CARDS_ID,
        payload: { cardsId },
    };
};
