import React from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { LearnCardTypes } from 'components/learnCard/types';
import s from 'pages/learnCard/LearnCard.module.css';
import { ReturnComponentType } from 'types';

export const LearnCardContainer = ({
    children,
    title,
}: LearnCardTypes): ReturnComponentType => {
    return (
        <Container className={s.container}>
            <NavLink to="/packs" className={s.breadcrumbs}>
                <ArrowBackIcon />
                <span>Back to packs List</span>
            </NavLink>
            <h2 className={s.title}>
                <span className={s.tooltip}>Learn:</span> {title}
            </h2>
            <div className={s.wrapper}>{children && children}</div>
        </Container>
    );
};
