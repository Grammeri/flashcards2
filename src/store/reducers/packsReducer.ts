import { PacksStateType } from './types';

import {
    SET_CARD_PACKS,
    SET_CURRENT_PAGE,
    SET_PACK_NAME,
    SET_PACKS_TOTAL_COUNT,
    SET_PAGE_COUNT,
    SET_SORT_PACKS,
    SET_CARDS_RANGE,
    SET_SEARCH_USER_ID,
    SET_SEARCH_PARAMS,
    SET_IS_MY_CARDS,
} from 'store/actions/constants';
import { PacksActionsType } from 'store/actions/types';

const initialState: PacksStateType = {
    cardPacks: [],
    searchParams: {
        packName: '',
        min: 0,
        max: 120,
        sortPacks: '0updated',
        page: 1,
        pageCount: 6,
        user_id: '',
    },
    isMyPack: false,
    cardPacksTotalCount: 0,
    isInitialized: false,
    selectedCardsPack: {
        _id: '',
        user_id: '',
        cardsCount: 0,
        name: '',
        created: '',
        grade: 0,
        path: '',
        private: false,
        type: '',
        deckCover: '',
        more_id: '',
        rating: 0,
        shots: 0,
        updated: '',
        user_name: '',
    },
};

export const packsReducer = (
    state = initialState,
    action: PacksActionsType,
): PacksStateType => {
    switch (action.type) {
        case SET_PACK_NAME: {
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    packName: action.payload.packName,
                },
            };
        }
        case SET_PAGE_COUNT:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    pageCount: action.payload.pageCount,
                },
            };
        case SET_PACKS_TOTAL_COUNT:
            return { ...state, cardPacksTotalCount: action.payload.packsTotalCount };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                searchParams: { ...state.searchParams, page: action.payload.page },
            };
        case SET_CARD_PACKS:
            return { ...state, cardPacks: action.payload.cardPacks };
        case SET_IS_MY_CARDS:
            return { ...state, isMyPack: action.payload.isMyPack };
        case SET_SORT_PACKS:
            return {
                ...state,
                searchParams: { ...state.searchParams, sortPacks: action.payload.sort },
            };
        case SET_CARDS_RANGE:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    min: action.payload.min,
                    max: action.payload.max,
                },
            };
        case SET_SEARCH_USER_ID:
            return {
                ...state,
                searchParams: {
                    ...state.searchParams,
                    user_id: action.payload.id,
                },
            };
        case SET_SEARCH_PARAMS:
            return {
                ...state,
                searchParams: { ...state.searchParams, ...action.payload.params },
                isInitialized: true,
            };
        case 'packs/SET_SELECTED_CARDS_PACK':
            return {
                ...state,
                selectedCardsPack: action.payload.pack,
            };
        default:
            return state;
    }
};
