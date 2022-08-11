import { REMOVE_CURRENT_ID_FROM_ID_LIST } from 'store/actions/constants';

export type RemoveCurrentIdFromIdListType = {
    type: typeof REMOVE_CURRENT_ID_FROM_ID_LIST;
    payload: { currentCardId: string };
};
