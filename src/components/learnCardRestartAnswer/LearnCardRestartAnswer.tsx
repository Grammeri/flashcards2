import React from 'react';

import { StyledButton } from 'components/header/styles';
import { LearnCardContainer } from 'components/learnCard/LearnCardContainer';
import s from 'pages/learnCard/LearnCard.module.css';
import { ReturnComponentType } from 'types';

export type LearnCardRestartAnswerType = {
    packName: string;
    handleNavigateToPack: () => void;
    handleTryAgain: () => void;
};

export const LearnCardRestartAnswer = ({
    handleNavigateToPack,
    handleTryAgain,
    packName,
}: LearnCardRestartAnswerType): ReturnComponentType => {
    return (
        <LearnCardContainer title={packName || ''}>
            <h3 className={s.center}> You answered all questions!</h3>
            <StyledButton
                className={s.btn}
                variant="contained"
                color="primary"
                onClick={handleNavigateToPack}
            >
                Back to packs
            </StyledButton>
            <StyledButton
                className={s.btn}
                variant="contained"
                color="primary"
                onClick={handleTryAgain}
            >
                Try again
            </StyledButton>
        </LearnCardContainer>
    );
};
