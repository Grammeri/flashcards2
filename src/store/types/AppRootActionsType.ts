import { AuthActionsType, LearnCardsActionType } from 'store/actions';
import { AppActionsType, CardsActionType, PacksActionsType } from 'store/actions/types';

export type AppRootActionsType =
    | AuthActionsType
    | AppActionsType
    | PacksActionsType
    | CardsActionType
    | LearnCardsActionType;
