import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    FormControl,
    InputAdornment,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import ReactModal from 'react-modal';
import { NavLink, useParams } from 'react-router-dom';

import s from './Cards.module.css';

import { CardsType } from 'api/types/cards/GetCardType/GetCardsType';
import { CardsTopContent } from 'components';
import { CardsList } from 'components/cartdList/CardsList';
import { DELAY } from 'constant';
import { useAppDispatch, useDebounce, useTypedSelector } from 'hooks';
import {
    setCardsPageAC,
    setCardsPageCountAC,
    setCardsQuestionAC,
} from 'store/actions/cards';
import { fetchCards } from 'store/middlewares';
import { createCard } from 'store/middlewares/cards/createCard';
import {
    selectAuthUserId,
    selectCardPacks,
    selectCardsPage,
    selectCardsPageCount,
    selectCardsTotalCount,
    selectUserIdFromPack,
} from 'store/selectors';
import { ReturnComponentType } from 'types';
import { NewCard } from 'utils/newCardCreator/newCardCreator';

ReactModal.setAppElement('#root');
export const Cards = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const { cardsPack_id } = useParams();

    const cards = useTypedSelector(state => state.cards.cards);
    const packs = useTypedSelector(selectCardPacks);
    const packUserId = useTypedSelector(selectUserIdFromPack);
    const userId = useTypedSelector(selectAuthUserId);
    const page = useTypedSelector(selectCardsPage);
    const pageCount = useTypedSelector(selectCardsPageCount);
    const cardsTotalCount = useTypedSelector(selectCardsTotalCount);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, DELAY);

    const currentPuck = packs.find(pack => pack._id === cardsPack_id);
    const currentPuckName = currentPuck?.name || '';

    const count = useMemo(() => {
        return Math.ceil(cardsTotalCount / pageCount) || 1;
    }, [cardsTotalCount, pageCount]);

    const disabled = userId !== packUserId;

    const addNewCard = (): void => {
        const newCard: CardsType = NewCard();

        // hardcode //
        newCard.grade = 0;
        newCard.question = 'new card';
        newCard.answer = 'some answer';
        // hardcode //

        dispatch(createCard({ ...newCard }));
    };

    const searchInputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    const changeCurrentPageHandler = (
        event: React.ChangeEvent<unknown>,
        value: number,
    ): void => {
        dispatch(setCardsPageAC(value));
    };

    const changeCardsSelectHandler = (event: SelectChangeEvent): void => {
        const pageCount = +event.target.value;

        dispatch(setCardsPageCountAC(pageCount));
    };

    useEffect(() => {
        dispatch(setCardsQuestionAC(debouncedValue));
    }, [debouncedValue]);

    useEffect(() => {
        if (cardsPack_id) {
            dispatch(fetchCards(cardsPack_id));
        }
    }, [debouncedValue, pageCount, page]);

    return (
        <div className={s.wrapper}>
            <NavLink to="/packs" className={s.breadcrumbs}>
                <ArrowBackIcon />
                <span>Back to packs List</span>
            </NavLink>
            <CardsTopContent
                title={currentPuckName}
                buttonName="Add new card"
                isButtonNeed
                callback={() => {
                    setIsOpen(true);
                }}
                disabled={disabled}
            >
                <TextField
                    name="searchCard"
                    variant="outlined"
                    label="Search"
                    fullWidth
                    onChange={searchInputHandler}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </CardsTopContent>

            <ReactModal
                isOpen={isOpen}
                onRequestClose={() => {
                    setIsOpen(false);
                }}
                style={{
                    overlay: {
                        backgroundColor: 'grey',
                    },
                    content: {
                        color: 'orange',
                    },
                }}
            >
                <button onClick={addNewCard} type="button">
                    Add new card
                </button>
                <span>
                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                        }}
                    >
                        X
                    </button>
                </span>
                <h4>Choose a question format</h4>
                <input type="text" />
                <h4>Question</h4>
                <h2>How This works in JavaScript</h2>
                <h4>Answer</h4>
                <h2>This is how This works in JavaScript</h2>
            </ReactModal>
            <CardsList
                cards={cards}
                cardsPack_id={cardsPack_id || ''}
                disabled={disabled}
            />
            <div className={s.paginationWrapper}>
                <Pagination
                    count={count}
                    page={page}
                    onChange={changeCurrentPageHandler}
                    shape="circular"
                    color="primary"
                />
                <div className={s.selectWrapper}>
                    <span>Show</span>
                    <Box sx={{ minWidth: 30 }}>
                        <FormControl size="small" variant="outlined">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={`${pageCount}`}
                                onChange={changeCardsSelectHandler}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <span>cards per page</span>
                </div>
            </div>
        </div>
    );
};
