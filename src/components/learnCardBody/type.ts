import React from 'react';

export type LearnCardBodyType = {
    showAnswer: boolean;
    answer: string;
    grade: string;
    grades: string[];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onNext: () => void;
    setShowAnswer: (showAnswer: boolean) => void;
};
