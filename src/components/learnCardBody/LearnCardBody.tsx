import React from 'react';

import { StyledButton } from 'components/header/styles';
import { LearnCardBodyType } from 'components/learnCardBody/type';
import { LearnCardRadio } from 'components/learnCardRadio/LearnCardRadio';
import s from 'pages/learnCard/LearnCard.module.css';
import { ReturnComponentType } from 'types';

export const LearnCardBody = React.memo(
    ({
        grade,
        grades,
        handleChange,
        setShowAnswer,
        showAnswer,
        answer,
        onNext,
    }: LearnCardBodyType): ReturnComponentType => {
        return (
            <div>
                {showAnswer ? (
                    <div className={s.answerContainer}>
                        <h3 className={s.question}>
                            Answer:<span className={s.answer}>{answer}</span>
                        </h3>
                        <hr />
                        <LearnCardRadio
                            grade={grade}
                            handleChange={handleChange}
                            grades={grades}
                        />
                        <StyledButton
                            className={s.btn}
                            variant="contained"
                            color="primary"
                            onClick={onNext}
                        >
                            Next question
                        </StyledButton>
                    </div>
                ) : (
                    <StyledButton
                        className={s.btn}
                        variant="contained"
                        color="primary"
                        onClick={() => setShowAnswer(true)}
                    >
                        Show answer
                    </StyledButton>
                )}
            </div>
        );
    },
);
