import { devToolsEnhancer } from '@redux-devtools/extension';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import {
    appReducer,
    authReducer,
    cardsReducer,
    learnCardReducer,
    packsReducer,
} from 'store/reducers';

const composedEnhancers = compose(applyMiddleware(thunk), devToolsEnhancer());

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
    learn: learnCardReducer,
});

export const store = createStore(rootReducer, undefined, composedEnhancers);
