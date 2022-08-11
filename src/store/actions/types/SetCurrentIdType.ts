import { SET_CURRENT_LEARNING_CARDS_ID } from 'store/actions/constants';

export type SetCurrentIdType = {
    type: typeof SET_CURRENT_LEARNING_CARDS_ID;
    payload: { currentCardId: string };
};
