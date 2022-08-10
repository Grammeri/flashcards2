import { CardType, SearchParamsType } from 'api/types';

export type PacksStateType = {
    cardPacks: CardType[];
    searchParams: SearchParamsType;
    cardPacksTotalCount: number;
    isMyPack: boolean;
    selectedCardsPack: CardType;
};
