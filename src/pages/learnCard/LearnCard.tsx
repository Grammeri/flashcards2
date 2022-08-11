import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import s from './LearnCard.module.css';

import { LearnCardContainer } from 'components/learnCard/LearnCardContainer';
import { LearnCardBody } from 'components/learnCardBody/LearnCardBody';
import { LearnCardHeader } from 'components/learnCardHeader/LearnCardHeader';
import { LearnCardRestartAnswer } from 'components/learnCardRestartAnswer/LearnCardRestartAnswer';
import { useAppDispatch, useTypedSelector } from 'hooks';
import { UseParamsType } from 'pages/learnCard/types';
import {
    removeCurrentIdFromIdListAC,
    setCurrentLearningCardIdAC,
    setLearningCardAC,
} from 'store/actions/learnCards';
import { fetchCards } from 'store/middlewares';
import { updateCardGrade } from 'store/middlewares/cards/updateCardGrade';
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

    const navigate = useNavigate();

    const { cardsPack_id } = useParams<UseParamsType>();

    const cards = useTypedSelector(state => state.learn.cardsFromPack);
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

    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [grade, setGrade] = useState('');
    const [first, setFirst] = useState(true);
    const [isAnsweredAll, setIsAnsweredAll] = useState(false);

    const onNext = (): void => {
        // console.log(`cardsIdList => ${cardsIdList}`);
        // console.log(`currentCardId => ${currentCardId}`);
        // console.log(card);
        const gradeNumber = grades.indexOf(grade) + 1;

        dispatch(updateCardGrade(gradeNumber, card._id));
        dispatch(removeCurrentIdFromIdListAC(currentCardId));
        setGrade('');

        if (cards.length > 0) {
            setCard(getRandomCard(cards));
        }

        setShowAnswer(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setGrade((event.target as HTMLInputElement).value);
    };

    const handleNavigateToPack = (): void => {
        navigate('/packs');
    };

    const handleTryAgain = (): void => {
        setIsAnsweredAll(false);
    };

    useEffect(() => {
        console.log('first useEffect');
        if (first) {
            if (cardsPack_id) {
                dispatch(fetchCards(cardsPack_id));
                setFirst(false);
            }
        }
    }, []);

    useEffect(() => {
        dispatch(setLearningCardAC(card));
        dispatch(setCurrentLearningCardIdAC(card._id));

        if (cards.length > 0) {
            setCard(getRandomCard(cards));
        }
    }, [card, cards]);

    useEffect(() => {
        if (!first) {
            if (cardsIdList.length === 0 && card._id !== '') {
                setIsAnsweredAll(true);
            }
        }

        return () => {
            setIsAnsweredAll(false);
        };
    }, [cardsIdList, first, card]);

    if (isAnsweredAll && card._id !== '') {
        return (
            <LearnCardRestartAnswer
                packName={packName}
                handleNavigateToPack={handleNavigateToPack}
                handleTryAgain={handleTryAgain}
            />
        );
    }

    if (cards.length === 0) {
        return (
            <LearnCardContainer title={packName || ''}>
                <h3 className={s.center}>There are no cards</h3>
            </LearnCardContainer>
        );
    }

    return (
        <LearnCardContainer title={packName || ''}>
            <LearnCardHeader question={card.question} shots={card.shots} />
            <LearnCardBody
                showAnswer={showAnswer}
                answer={card.answer}
                grade={grade}
                grades={grades}
                handleChange={handleChange}
                onNext={onNext}
                setShowAnswer={setShowAnswer}
            />
        </LearnCardContainer>
    );
};
