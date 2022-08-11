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
        case 'learn/SET_LEARNING_CARDS_ID':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
