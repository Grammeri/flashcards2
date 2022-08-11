import {
    REMOVE_CURRENT_ID_FROM_ID_LIST,
    SET_CARDS,
    SET_CARDS_FROM_PACK,
    SET_CURRENT_LEARNING_CARDS_ID,
    SET_LEARNING_CARD,
    SET_LEARNING_CARDS_ID,
    SET_UPDATED_GRADE,
} from 'store/actions/constants';
import { LearnCardsActionType } from 'store/actions/types';
import { LearnCardStateType } from 'store/reducers/types';

const initialState: LearnCardStateType = {
    cardsId: [],
    currentCardId: '',
    currentCard: {
        cardsPack_id: '',
        question: '',
        answer: '',
        grade: 0,
        shots: 0,
        user_id: '',
        _id: '',
        type: '',
        rating: 0,
    },
    cardsFromPack: [],
};

export const learnCardReducer = (
    state = initialState,
    action: LearnCardsActionType,
): LearnCardStateType => {
    switch (action.type) {
        case SET_LEARNING_CARDS_ID:
            return { ...state, cardsId: action.payload.cardsId };
        case SET_CURRENT_LEARNING_CARDS_ID:
            return {
                ...state,
                currentCardId: action.payload.currentCardId,
            };
        case REMOVE_CURRENT_ID_FROM_ID_LIST:
            return {
                ...state,
                cardsId: state.cardsId.filter(id => id !== action.payload.currentCardId),
            };
        case SET_LEARNING_CARD:
            return {
                ...state,
                currentCard: action.payload.card,
            };
        case SET_CARDS_FROM_PACK:
            return {
                ...state,
                cardsFromPack: action.payload.cards,
            };
        case SET_CARDS:
            return {
                ...state,
                cardsFromPack: action.payload.data.cards,
                cardsId: action.payload.data.cards.map(card => card._id),
            };
        case SET_UPDATED_GRADE:
            return {
                ...state,
                cardsFromPack: state.cardsFromPack.map(card =>
                    card._id === action.payload.updatedCard.updatedGrade.card_id
                        ? {
                              ...card,
                              ...action.payload.updatedCard.updatedGrade,
                              _id: action.payload.updatedCard.updatedGrade.card_id,
                          }
                        : card,
                ),
            };

        default:
            return state;
    }
};
