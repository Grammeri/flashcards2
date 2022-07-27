import React, { useEffect } from 'react';

import { Container, Grid, LinearProgress } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header, Links, SnackBar } from 'components';
import { PROGRESS_STYLE } from 'constant';
import { REQUEST_STATUS } from 'enums';
import { useAppDispatch, useTypedSelector } from 'hooks';
import {
    SetNewPassword,
    ForgotPassword,
    NotFound,
    Profile,
    Registration,
    SignIn,
} from 'pages';
import { me } from 'store/middlewares/me';
import { ReturnComponentType } from 'types';

const App = (): ReturnComponentType => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(me());
    }, []);
    const status = useTypedSelector(state => state.app.status);

    return (
        <BrowserRouter>
            {status === REQUEST_STATUS.LOADING && (
                <LinearProgress style={PROGRESS_STYLE} color="primary" />
            )}
            <Header />
            <Container fixed>
                <Grid container justifyContent="center">
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="login" element={<SignIn />} />
                        <Route path="registration" element={<Registration />} />
                        <Route path="profile" element={<Profile />} />
                        <Route
                            path="password_recovery/:token"
                            element={<SetNewPassword />}
                        />
                        <Route path="enter_new_password" element={<ForgotPassword />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Grid>
            </Container>
            <Links />
            <SnackBar />
        </BrowserRouter>
    );
};

export default App;
