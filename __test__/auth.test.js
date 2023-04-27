import * as fireAuth from 'firebase/auth';
import { call, put, takeEvery } from 'redux-saga/effects';
import { describe } from '@jest/globals';
import '@testing-library/jest-dom';

import { authActions } from '../slices/auth';
import { toastActions } from '../slices/toast';
import toastTypes from '@/constants/toastTypes';

jest.mock('firebase/auth');

describe('auth', () => {
  it('should sign in with fake email and password', () => {
    const auth = fireAuth.getAuth();
  });
});
