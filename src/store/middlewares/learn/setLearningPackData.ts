import { AxiosError } from 'axios';

import { CardsType, LearnCardType } from 'api/types/cards/GetCardType/GetCardsType';
import { REQUEST_STATUS } from 'enums';
import { setAppStatusAC } from 'store/actions';
import {
    setCurrentLearningCardIdAC,
    setLearningCardAC,
    setLearningCardsIdAC,
} from 'store/actions/learnCards';
import { fetchCards } from 'store/middlewares/cards/fetchCards';
import { AppThunkType } from 'store/types';
import { errorHandler } from 'utils';

export const setLearningPackData =
    (card: LearnCardType, cards: CardsType[], cardsPack_id: string): AppThunkType =>
    async dispatch => {
        try {
            dispatch(setAppStatusAC(REQUEST_STATUS.LOADING));

            dispatch(fetchCards(cardsPack_id));

            dispatch(setLearningCardAC(card));
            dispatch(setCurrentLearningCardIdAC(card._id));
            dispatch(setLearningCardsIdAC());
        } catch (e) {
            errorHandler(e as Error | AxiosError, dispatch);
        } finally {
            dispatch(setAppStatusAC(REQUEST_STATUS.IDLE));
        }
    };
