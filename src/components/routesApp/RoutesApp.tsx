import React from 'react';

import { Container, Grid } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

import errorImage from '../../assets/images/404.jpg';

import {
    ForgotPassword,
    PacksList,
    Profile,
    Registration,
    SetNewPassword,
    SignIn,
} from 'pages';
import { Cards } from 'pages/cards/Cards';
import { LearnCard } from 'pages/learnCard/LearnCard';
import { ReturnComponentType } from 'types';

export const RoutesApp = (): ReturnComponentType => {
    return (
        <Container fixed>
            <Grid container justifyContent="center">
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="login" element={<SignIn />} />
                    <Route path="packs" element={<PacksList />} />
                    <Route path="packs/:cardsPack_id" element={<Cards />} />
                    <Route path="registration" element={<Registration />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="password_recovery/:token" element={<SetNewPassword />} />
                    <Route path="enter_new_password" element={<ForgotPassword />} />
                    <Route path="learn/:cardsPack_id" element={<LearnCard />} />
                    <Route
                        path="404"
                        element={<img alt="Error 404" src={errorImage} />}
                    />
                    <Route path="*" element={<Navigate to="404" />} />
                </Routes>
            </Grid>
        </Container>
    );
};
