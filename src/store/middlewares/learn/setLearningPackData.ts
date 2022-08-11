import { AxiosError } from 'axios';

import { CardsType, LearnCardType } from 'api/types/cards/GetCardType/GetCardsType';
import { REQUEST_STATUS } from 'enums';
import { setAppStatusAC } from 'store/actions';
import {
    setCardsFromPackAC,
    setCurrentLearningCardIdAC,
    setLearningCardAC,
    setLearningCardsIdAC,
} from 'store/actions/learnCards';
import { AppThunkType } from 'store/types';
import { errorHandler } from 'utils';

export const setLearningPackData =
    (card: LearnCardType, cards: CardsType[]): AppThunkType =>
    async dispatch => {
        try {
            const cardsIdList = cards.map(card => card._id);

            dispatch(setAppStatusAC(REQUEST_STATUS.LOADING));

            dispatch(setLearningCardAC(card));
            dispatch(setCurrentLearningCardIdAC(card._id));
            dispatch(setCardsFromPackAC(cards));
            dispatch(setLearningCardsIdAC(cardsIdList));
        } catch (e) {
            errorHandler(e as Error | AxiosError, dispatch);
        } finally {
            dispatch(setAppStatusAC(REQUEST_STATUS.IDLE));
        }
    };
