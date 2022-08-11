import { CardsType } from 'api/types/cards/GetCardType/GetCardsType';

const maxGrade = 6;

export const getRandomCard = (cards: CardsType[]): CardsType => {
    const sum = cards.reduce(
        (acc, card) => acc + (maxGrade - card.grade) * (maxGrade - card.grade),
        0,
    );
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (maxGrade - card.grade) * (maxGrade - card.grade);

            return { sum: newSum, id: newSum < rand ? i : acc.id };
        },
        { sum: 0, id: -1 },
    );

    // console.log('test: ', sum, rand, res);

    return cards[res.id + 1];
};
