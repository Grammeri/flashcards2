import { GetCardsType } from 'api/types';
import { CardsActionType } from 'store/actions/types';

const initialState: GetCardsType = {
    cards: [],
    searchParams: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        min: 0,
        max: 4,
        sortCards: '0updated',
        page: 1,
        pageCount: 5,
    },
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 5,
    packUserId: '',
    cardsPack_id: '',
};

export const cardsReducer = (
    state = initialState,
    action: CardsActionType,
): GetCardsType => {
    switch (action.type) {
        case 'cards/SET_CARDS':
            return { ...state, ...action.payload.data };
        case '/cards/SET_CARDS_SEARCH_PARAMS':
            return {
                ...state,
                searchParams: { ...state.searchParams, ...action.payload.searchParams },
            };
        case 'cards/SET_CARDS_PACK_ID':
            return {
                ...state,
                cardsPack_id: action.payload.cardsPack_id,
            };
        case 'cards/SET_CARD_QUESTION':
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    cardQuestion: action.payload.question,
                },
            };
        case 'cards/SET_CARDS_PAGE_COUNT':
            return {
                ...state,
                pageCount: action.payload.pageCount,
                searchParams: {
                    ...state.searchParams,
                    pageCount: action.payload.pageCount,
                },
            };
        case 'cards/SET_CARDS_PAGE':
            return {
                ...state,
                page: action.payload.page,
                searchParams: { ...state.searchParams, page: action.payload.page },
            };
        case 'cards/SET_UPDATED_GRADE':
            return {
                ...state,
                cards: state.cards.map(card =>
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
