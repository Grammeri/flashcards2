import { CardsType } from 'api/types/cards/GetCardType/GetCardsType';
import { SET_CARDS_FROM_PACK } from 'store/actions/constants';

export type SetCardsFromPackType = {
    type: typeof SET_CARDS_FROM_PACK;
    payload: { cards: CardsType[] };
};
