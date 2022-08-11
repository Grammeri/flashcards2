import React from 'react';

export type LearnCardRadioType = {
    grade: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    grades: string[];
};
