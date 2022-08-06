import React, { useState } from 'react';

import { ArrowDropDown } from '@mui/icons-material';
import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';

import { OrderDirectionType } from './types';

import { PACK_COLUMNS } from 'constant';
import { useAppDispatch, useTypedSelector } from 'hooks';
import { selectSortPacks } from 'store/selectors';
import { ColumnSortType, ReturnComponentType } from 'types';
import { handleSortType } from 'utils';

export const MainTableRow = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    const sortPacks = useTypedSelector(selectSortPacks);

    const [nameDirection, setNameDirection] = useState<OrderDirectionType>('asc');
    const [cardsDirection, setCardsDirection] = useState<OrderDirectionType>('asc');
    const [updatedDirection, setUpdatedDirection] = useState<OrderDirectionType>('asc');

    const handleSortRequest = (sort: ColumnSortType): void => {
        if (sort === 'name') {
            handleSortType(setNameDirection, nameDirection, sort, dispatch);
        }
        if (sort === 'cardsCount') {
            handleSortType(setCardsDirection, cardsDirection, sort, dispatch);
        }
        if (sort === 'updated') {
            handleSortType(setUpdatedDirection, updatedDirection, sort, dispatch);
        }
    };

    const mappedColumns = PACK_COLUMNS.map(column => {
        if (!column.sort) {
            return (
                <TableCell
                    key={column.id}
                    style={{
                        background: 'rgb(239,239,239)',
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '17px',
                    }}
                    align={column.align}
                    padding="normal"
                    width={column.minWidth}
                >
                    {column.label}
                </TableCell>
            );
        }

        let direction;
        let sort;

        if (column.id === 'name') {
            direction = nameDirection;
            sort = 'name';
        }
        if (column.id === 'cardsCount') {
            direction = cardsDirection;
            sort = 'cardsCount';
        }
        if (column.id === 'updated') {
            direction = updatedDirection;
            sort = 'updated';
        }

        return (
            <TableCell
                onClick={() => handleSortRequest(column.sort)}
                key={column.id}
                style={{
                    background: 'rgb(239,239,239)',
                    fontWeight: '600',
                    fontSize: '14px',
                    lineHeight: '17px',
                }}
                align={column.align}
                padding="normal"
                width={column.minWidth}
            >
                <TableSortLabel
                    active={sortPacks.slice(1) === sort}
                    direction={direction}
                    IconComponent={ArrowDropDown}
                >
                    {column.label}
                </TableSortLabel>
            </TableCell>
        );
    });

    return (
        <TableHead>
            <TableRow>{mappedColumns}</TableRow>
        </TableHead>
    );
};
