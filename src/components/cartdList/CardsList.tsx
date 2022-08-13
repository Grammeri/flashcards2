import React, { useState } from 'react';

import { ArrowDropDown } from '@mui/icons-material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import {
    Paper,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ReactModal from 'react-modal';

import s from './CardList.module.css';

import { SearchParamsCardsType } from 'api/types';
import { CardsType } from 'api/types/cards/GetCardType/GetCardsType';
import { CardsListPropsType } from 'components/cartdList/types';
import { OrderDirectionType } from 'components/mainTableRow/types';
import { useAppDispatch } from 'hooks';
import { setCardsSearchParamsAC } from 'store/actions/cards';
import { fetchCards } from 'store/middlewares';
import { deleteCard } from 'store/middlewares/cards/deleteCard';
import { updateCard } from 'store/middlewares/cards/updateCard';
import { ReturnComponentType } from 'types';

const UPDATE_SORT_BTN_ID = 'updateSortBtn';
const UPDATE_FIELD_NAME = 'updated';
const GRADE_SORT_BTN_ID = 'gradeSortBtn';
const GRADE_FIELD_NAME = 'grade';

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

ReactModal.setAppElement('#root');
export const CardsList = ({
    cards,
    cardsPack_id,
    disabled,
}: CardsListPropsType): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

    const [updateDirection, setUpdateDirection] = useState<OrderDirectionType>('asc');
    const [gradeDirection, setGradeDirection] = useState<OrderDirectionType>('asc');

    const disableClass = disabled ? s.disabledIcon : '';

    const handleSort = (e: React.MouseEvent<HTMLElement>): void => {
        let sortCards: string;

        if (e.currentTarget.id === UPDATE_SORT_BTN_ID) {
            sortCards =
                updateDirection === 'asc'
                    ? `1${UPDATE_FIELD_NAME}`
                    : `0${UPDATE_FIELD_NAME}`;
            setUpdateDirection(updateDirection === 'asc' ? 'desc' : 'asc');
            dispatch(
                setCardsSearchParamsAC({
                    cardsPack_id,
                    sortCards,
                } as SearchParamsCardsType),
            );
        }
        if (e.currentTarget.id === GRADE_SORT_BTN_ID) {
            sortCards =
                gradeDirection === 'asc'
                    ? `1${GRADE_FIELD_NAME}`
                    : `0${GRADE_FIELD_NAME}`;
            setGradeDirection(gradeDirection === 'asc' ? 'desc' : 'asc');
            dispatch(
                setCardsSearchParamsAC({
                    cardsPack_id,
                    sortCards,
                } as SearchParamsCardsType),
            );
        }

        if (cardsPack_id) {
            dispatch(fetchCards(cardsPack_id));
        }
    };

    const editCardHandler = (card: CardsType): void => {
        // hardcode //
        const updatedCard = { ...card };

        updatedCard.question = 'updated question';
        updatedCard.answer = 'updated answer';
        // hardcode //

        dispatch(updateCard(updatedCard));
        setEditOpen(false);
    };

    const deleteCardHandler = (cardId: string): void => {
        dispatch(deleteCard(cardId));
        setDeleteOpen(false);
    };

    if (cards.length === 0) {
        return <h3>Oops, cards not added yet</h3>;
    }

    return (
        <Paper sx={{ width: '100%' }} style={{ marginTop: '25px' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={s.tableHead}>Question</TableCell>
                            <TableCell className={s.tableHead}>Answer</TableCell>
                            <TableCell
                                className={`${s.tableHead} ${s.pointer}`}
                                onClick={handleSort}
                                id={UPDATE_SORT_BTN_ID}
                            >
                                Last Updated(g)
                                <TableSortLabel
                                    active
                                    IconComponent={ArrowDropDown}
                                    direction={updateDirection}
                                />
                            </TableCell>
                            <TableCell
                                className={`${s.tableHead} ${s.pointer}`}
                                onClick={handleSort}
                                id={GRADE_SORT_BTN_ID}
                            >
                                Grade(g)
                                <TableSortLabel
                                    active
                                    IconComponent={ArrowDropDown}
                                    direction={gradeDirection}
                                />
                            </TableCell>
                            <TableCell className={`${s.tableHead}`} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map(card => {
                            const { grade } = card;

                            return (
                                <TableRow
                                    key={card._id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                    }}
                                    hover
                                >
                                    <TableCell component="th" scope="row">
                                        {card.question}
                                    </TableCell>
                                    <TableCell>{card.answer}</TableCell>
                                    <TableCell>{card.updated}</TableCell>
                                    <TableCell>
                                        <Rating
                                            value={grade}
                                            name="rating"
                                            precision={0.1}
                                            size="small"
                                            readOnly
                                        />
                                    </TableCell>
                                    <TableCell className={s.controls}>
                                        <ModeEditOutlineOutlinedIcon
                                            className={`${s.editBtn} ${s.btn} ${disableClass}`}
                                            onClick={() => setEditOpen(true)}
                                        />
                                        <Modal
                                            open={editOpen}
                                            onClose={() => setEditOpen(true)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Typography
                                                        id="modal-modal-title"
                                                        variant="h6"
                                                        component="h2"
                                                    >
                                                        Edit card
                                                    </Typography>

                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            setEditOpen(false);
                                                        }}
                                                    >
                                                        X
                                                    </Button>
                                                </div>

                                                <TextField
                                                    id="standard-basic"
                                                    label="New name"
                                                    variant="standard"
                                                />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        margin: '30px',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        onClick={() =>
                                                            editCardHandler(card)
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                </div>
                                            </Box>
                                        </Modal>
                                        <DeleteOutlineOutlinedIcon
                                            className={`${s.deleteBtn} ${s.btn} ${disableClass}`}
                                            onClick={() => setDeleteOpen(true)}
                                        />
                                        <Modal
                                            open={deleteOpen}
                                            onClose={() => setDeleteOpen(true)}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Typography
                                                        id="modal-modal-title"
                                                        variant="h6"
                                                        component="h2"
                                                    >
                                                        Delete card
                                                    </Typography>

                                                    <Button
                                                        variant="contained"
                                                        onClick={() => {
                                                            setDeleteOpen(false);
                                                        }}
                                                    >
                                                        X
                                                    </Button>
                                                </div>

                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        margin: '30px',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteCardHandler(card._id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </Box>
                                        </Modal>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

/// /////////////////////////
/*
<ReactModal
    isOpen={editIsOpen}
    onRequestClose={() => {
        setEditIsOpen(false);
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
    <h2>Edit card</h2>
    <span>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditIsOpen(false);
                                                    }}
                                                >
                                                    X
                                                </button>
                                            </span>
    <h4>Choose a question format</h4>
    <input type="text" />
    <h4>Question</h4>
    <input
        type="text"
        value=""
        placeholder="Questions"
    />
    <h4>Answer</h4>
    <input
        type="text"
        value=""
        placeholder="Answers"
    />
    <div />
    <button
        onClick={() => editCardHandler(card)}
        type="button"
    >
        Save
    </button>
    <button
        type="button"
        onClick={() => {
            setEditIsOpen(false);
        }}
    >
        Cancel
    </button>
</ReactModal> */
