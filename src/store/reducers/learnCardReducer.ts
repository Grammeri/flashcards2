import { SET_LEARNING_CARDS_ID } from 'store/actions/constants';
import { LearnCardsActionType } from 'store/actions/types';
import { LearnCardStateType } from 'store/reducers/types';

const initialState: LearnCardStateType = {
    cardsId: [],
    currentCardId: '',
};

export const learnCardReducer = (
    state = initialState,
    action: LearnCardsActionType,
): LearnCardStateType => {
    switch (action.type) {
        case SET_LEARNING_CARDS_ID:
            return { ...state, cardsId: action.payload.cardsId };
        default:
            return state;
    }
};
