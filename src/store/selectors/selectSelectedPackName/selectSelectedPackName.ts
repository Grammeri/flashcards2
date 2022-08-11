import { AppRootState } from 'store/types';

export const selectSelectedPackName = (state: AppRootState): string => {
    if (state.packs.selectedCardsPack) {
        return state.packs.selectedCardsPack.name;
    }

    return '';
};
