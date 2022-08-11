import { AuthUserDataType, CardType, GetCardsType } from 'api/types';
import { REQUEST_STATUS } from 'enums';
import {
    selectAppStatus,
    selectAuthError,
    selectAuthInfo,
    selectAuthUserId,
    selectCardPacks,
    selectGoToLogin,
    selectId,
    selectIsEmailSent,
    selectIsInitialized,
    selectIsUserAuth,
    selectMax,
    selectMin,
    selectPackName,
    selectPacksTotalCount,
    selectPage,
    selectPageCount,
    selectSortPacks,
} from 'store/selectors';
import { AppRootState } from 'store/types';

let state: AppRootState;
const defaultPageCount = 4;
const defaultPacksTotalCount = 100;
const maxCardsCount = 4;

beforeEach(() => {
    state = {
        app: {
            status: REQUEST_STATUS.IDLE,
            isInitialized: false,
            error: null,
            modal: {
                isOpen: false,
                modalTitle: '',
                type: '',
                buttonName: '',
            },
        },
        auth: {
            error: 'some error',
            info: null,
            isUserAuth: false,
            goToLogin: false,
            isEmailSent: false,
            authUserData: {
                _id: 'test id',
            } as AuthUserDataType,
        },
        packs: {
            cardPacks: [],
            searchParams: {
                packName: 'Some pack name',
                min: 1,
                max: maxCardsCount,
                sortPacks: '1updated',
                page: 1,
                pageCount: defaultPageCount,
                user_id: 'some user ID',
            },
            cardPacksTotalCount: defaultPacksTotalCount,
            isInitialized: false,
            selectedCardsPack: {} as CardType,
            isMyPack: false,
        },
        cards: {} as GetCardsType,
        learn: { cardsId: [], currentCardId: '' },
    };
});

describe('select', () => {
    test('AuthError', () => {
        const error = selectAuthError(state);

        expect(error).toBe('some error');
    });

    test('AuthInfo', () => {
        const info = selectAuthInfo(state);

        expect(info).toBeNull();
    });

    test('GoToLogin', () => {
        const goToLogin = selectGoToLogin(state);

        expect(goToLogin).toBeFalsy();
    });

    test('IsEmailSent', () => {
        const isEmailSent = selectIsEmailSent(state);

        expect(isEmailSent).toBeFalsy();
    });

    test('AppStatus', () => {
        const status = selectAppStatus(state);

        expect(status).toBe(REQUEST_STATUS.IDLE);
    });

    test('isUserAuth', () => {
        const isUserAuth = selectIsUserAuth(state);

        expect(isUserAuth).toBeFalsy();
    });

    test('isInitialized', () => {
        const isInitialized = selectIsInitialized(state);

        expect(isInitialized).toBeFalsy();
    });

    test('cardPacks', () => {
        const cardPacks = selectCardPacks(state);

        expect(cardPacks).toEqual([]);
    });

    test('authUserId', () => {
        const authUserId = selectAuthUserId(state);

        expect(authUserId).toBe('test id');
    });

    test('page', () => {
        const page = selectPage(state);

        expect(page).toBe(1);
    });

    test('pageCount', () => {
        const pageCount = selectPageCount(state);

        expect(pageCount).toBe(defaultPageCount);
    });

    test('packsTotalCount', () => {
        const packsTotalCount = selectPacksTotalCount(state);

        expect(packsTotalCount).toBe(defaultPacksTotalCount);
    });

    test('sortPacks', () => {
        const sortPacks = selectSortPacks(state);

        expect(sortPacks).toBe('1updated');
    });

    test('packName', () => {
        const packName = selectPackName(state);

        expect(packName).toBe('Some pack name');
    });

    test('min', () => {
        const min = selectMin(state);

        expect(min).toBe(1);
    });

    test('max', () => {
        const max = selectMax(state);

        expect(max).toBe(maxCardsCount);
    });

    test('id', () => {
        const id = selectId(state);

        expect(id).toBe('some user ID');
    });
});

export {};
