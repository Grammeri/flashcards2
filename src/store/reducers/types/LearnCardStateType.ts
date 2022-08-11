import { CardsType, LearnCardType } from 'api/types/cards/GetCardType/GetCardsType';

export type LearnCardStateType = {
    cardsId: string[];
    currentCardId: string;
    currentCard: LearnCardType;
    cardsFromPack: CardsType[];
};
