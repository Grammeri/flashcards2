import React from 'react';

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';

import { LearnCardRadioType } from 'components/learnCardRadio/types';
import { ReturnComponentType } from 'types';

export const LearnCardRadio = React.memo(
    ({ grade, grades, handleChange }: LearnCardRadioType): ReturnComponentType => {
        return (
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Rate yourself:</FormLabel>
                <RadioGroup
                    aria-labelledby="grades"
                    name="grade"
                    value={grade}
                    onChange={handleChange}
                >
                    {grades.map(grade => {
                        return (
                            <FormControlLabel
                                key={`${grade}key`}
                                value={grade}
                                control={<Radio />}
                                label={grade}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>
        );
    },
);
