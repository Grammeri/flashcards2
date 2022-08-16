import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import {
    FormControl,
    InputAdornment,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Cards = (): ReturnComponentType => {
    const {
        register,
        formState: { /* errors, */ isValid },
        handleSubmit,
        reset,
    } = useForm<{ question: string; answer: string }>({
        mode: 'onBlur',
    });

    const dispatch = useAppDispatch();

    const { cardsPack_id } = useParams();

    const cards = useTypedSelector(state => state.cards.cards);
    const packs = useTypedSelector(selectCardPacks);
    const packUserId = useTypedSelector(selectUserIdFromPack);
    const userId = useTypedSelector(selectAuthUserId);
    const page = useTypedSelector(selectCardsPage);
    const pageCount = useTypedSelector(selectCardsPageCount);
    const cardsTotalCount = useTypedSelector(selectCardsTotalCount);

    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, DELAY);

    const currentPuck = packs.find(pack => pack._id === cardsPack_id);
    const currentPuckName = currentPuck?.name || '';

    const count = useMemo(() => {
        return Math.ceil(cardsTotalCount / pageCount) || 1;
    }, [cardsTotalCount, pageCount]);

    const disabled = userId !== packUserId;

    const onSubmit = (data: { question: string; answer: string }): void => {
        alert(JSON.stringify(data));
        addNewCard(data);
        reset();
    };

    const addNewCard = (data: { question: string; answer: string }): void => {
        const newCard: CardsType = NewCard();

        // hardcode //
        newCard.grade = 0;
        newCard.question = data.question;
        newCard.answer = data.answer;
        // hardcode //

        dispatch(createCard({ ...newCard }));
        setOpen(false);
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
                    setOpen(true);
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
            <Modal
                open={open}
                onClose={() => setOpen(true)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add new card
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            X
                        </Button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div style={{ height: 40 }}>
                            <input
                                placeholder="Name your card"
                                {...register('question', {
                                    required: 'Name your card, Body!',
                                })}
                            />
                            {/*                        <div style={{ height: 40 }}>
                            {errors?.question && (
                                <p>{errors?.question?.message || 'Error!'}</p>
                            )}
                        </div> */}
                        </div>
                        <div style={{ height: 40 }}>
                            <input
                                placeholder="Name your answer"
                                {...register('answer', {
                                    required: 'Name your answer, Body!',
                                })}
                            />
                            {/*                        <div style={{ height: 40 }}>
                            {errors?.answer && (
                                <p>{errors?.answer?.message || 'Error!'}</p>
                            )}
                        </div> */}
                        </div>
                        <input type="submit" disabled={!isValid} />
                    </form>
                </Box>
            </Modal>
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

/// /////////////////////////////
/* const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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

    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [cardName, setCardName] = useState<string>('');
    const [answerName, setAnswerName] = useState<string>('');
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
        newCard.question = cardName;
        newCard.answer = answerName;
        // hardcode //

        dispatch(createCard({ ...newCard }));
        setOpen(false);
        setAnswerName('');
        if (cardName !== '') {
            setCardName('');
        }
        if (answerName !== '') {
            setAnswerName('');
        }
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
                    setOpen(true);
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
            <Modal
                open={open}
                onClose={() => setOpen(true)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add new card
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            X
                        </Button>
                    </div>

                    <TextField
                        id="standard-basic"
                        label="Name your new card"
                        variant="standard"
                        value={cardName}
                        onChange={e => {
                            setCardName(e.currentTarget.value);
                        }}
                    />

                    <TextField
                        id="standard-basic"
                        label="Name your answer"
                        variant="standard"
                        value={answerName}
                        onChange={e => {
                            setAnswerName(e.currentTarget.value);
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            margin: '30px',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button variant="contained" onClick={addNewCard}>
                            Save
                        </Button>
                    </div>
                </Box>
            </Modal>
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
}; */
