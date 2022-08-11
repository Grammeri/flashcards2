import { SET_SLIDER } from 'store/actions/constants';
import { SetSliderType } from 'store/actions/types/SetSliderType';

export const sliderAC = (min: number, max: number): SetSliderType => {
    return {
        type: SET_SLIDER,
        payload: { min, max },
    } as const;
};
