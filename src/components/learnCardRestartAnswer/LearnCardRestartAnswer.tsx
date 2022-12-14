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

export const LearnCardRestartAnswer = React.memo(
    ({
        handleNavigateToPack,
        handleTryAgain,
        packName,
    }: LearnCardRestartAnswerType): ReturnComponentType => {
        return (
            <LearnCardContainer title={packName || ''}>
                <h3 className={s.center}> You answered all questions!</h3>
                <div className={s.buttonGroup}>
                    <StyledButton
                        className={s.btn}
                        variant="outlined"
                        color="primary"
                        onClick={handleNavigateToPack}
                    >
                        Back to packs
                    </StyledButton>
                    <StyledButton
                        className={s.btn}
                        variant="outlined"
                        color="primary"
                        onClick={handleTryAgain}
                    >
                        Try again
                    </StyledButton>
                </div>
            </LearnCardContainer>
        );
    },
);
