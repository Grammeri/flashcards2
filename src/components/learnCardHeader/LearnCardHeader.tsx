import React from 'react';

import { LearnCardHeaderType } from 'components/learnCardHeader/type';
import s from 'pages/learnCard/LearnCard.module.css';
import { ReturnComponentType } from 'types';

export const LearnCardHeader = ({
    shots,
    question,
}: LearnCardHeaderType): ReturnComponentType => {
    return (
        <>
            <p className={s.description}>Number of replies: {shots}</p>
            <h3 className={s.question}>
                Question: <span className={s.answer}>{question}</span>
            </h3>
        </>
    );
};
