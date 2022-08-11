import React, { useEffect, useState } from 'react';

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useParams } from 'react-router-dom';

import s from './LearnCard.module.css';

import { StyledButton } from 'components/header/styles';
import { LearnCardContainer } from 'components/learnCard/LearnCardContainer';
import { useAppDispatch, useTypedSelector } from 'hooks';
import { UseParamsType } from 'pages/learnCard/types';
import { fetchCards } from 'store/middlewares';
import { updateCardGrade } from 'store/middlewares/cards/updateCardGrade';
import { setLearningPackData } from 'store/middlewares/learn/setLearningPackData';
import { selectSelectedPackName } from 'store/selectors/selectSelectedPackName/selectSelectedPackName';
import { ReturnComponentType } from 'types';
import { getRandomCard } from 'utils/getRandomCard/getRandomCard';

const grades = [
    'Did not know',
    'Forgot',
    'A lot of thought',
    'Confused',
    'Knew the answer',
];

export const LearnCard = (): ReturnComponentType => {
    console.log(`learnCard rendered`);

    const dispatch = useAppDispatch();

    const { cardsPack_id } = useParams<UseParamsType>();

    const cards = useTypedSelector(state => state.cards.cards);
    const packName = useTypedSelector(selectSelectedPackName);

    const cardsIdList = useTypedSelector(state => state.learn.cardsId);
    const currentCardId = useTypedSelector(state => state.learn.currentCardId);

    const [card, setCard] = useState({
        cardsPack_id: '',
        question: '',
        answer: '',
        grade: 0,
        shots: 0,
        user_id: '',
        _id: '',
        type: '',
        rating: 0,
    });

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [grade, setGrade] = useState('');
    const [first, setFirst] = useState(true);
    // const [isAnsweredAll, setIsAnsweredAll] = useState(false);

    console.log(`cardsIdList => ${cardsIdList}`);
    console.log(`currentCardId => ${currentCardId}`);

    const onNext = (): void => {
        const gradeNumber = grades.indexOf(grade) + 1;

        dispatch(updateCardGrade(gradeNumber, card._id));

        setIsChecked(false);
        setGrade('');

        if (cards.length > 0) {
            setCard(getRandomCard(cards));
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setGrade((event.target as HTMLInputElement).value);
    };

    // const handleNavigateToPack = (): void => {
    //     navigate('/packs');
    // };
    //
    // const handleTryAgain = (): void => {
    //     setIsAnsweredAll(false);
    // };

    useEffect(() => {
        if (first) {
            if (cardsPack_id) {
                dispatch(fetchCards(cardsPack_id));
                setFirst(false);
            }
        }

        if (cards.length > 0) {
            setCard(getRandomCard(cards));
        }
    }, [cards, dispatch, first, cardsPack_id]);

    useEffect(() => {
        dispatch(setLearningPackData(card, cards));
    }, [card, cards]);

    // if (isAnsweredAll) {
    //     return (
    //         <LearnCardContainer title={packName || ''}>
    //             <h3 className={s.center}> You answered all questions!</h3>
    //             <StyledButton
    //                 className={s.btn}
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={handleNavigateToPack}
    //             >
    //                 Back to packs
    //             </StyledButton>
    //             <StyledButton
    //                 className={s.btn}
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={handleTryAgain}
    //             >
    //                 Try again
    //             </StyledButton>
    //         </LearnCardContainer>
    //     );
    // }

    if (cards.length === 0) {
        return (
            <LearnCardContainer title={packName || ''}>
                <h3 className={s.center}>There are no cards</h3>
            </LearnCardContainer>
        );
    }

    return (
        <LearnCardContainer title={packName || ''}>
            <p className={s.description}>Number of replies: {card.shots}</p>
            <h3 className={s.question}>
                Question: <span className={s.answer}>{card.question}</span>
            </h3>
            <div>
                {isChecked ? (
                    <div className={s.answerContainer}>
                        <h3 className={s.question}>
                            Answer:<span className={s.answer}>{card.answer}</span>
                        </h3>
                        <hr />
                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">
                                Rate yourself:
                            </FormLabel>
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
                        onClick={() => setIsChecked(true)}
                    >
                        Show answer
                    </StyledButton>
                )}
            </div>
        </LearnCardContainer>
    );
};
