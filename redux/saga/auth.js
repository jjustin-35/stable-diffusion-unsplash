import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  updateEmail,
  deleteUser,
} from 'firebase/auth';
import { call, put, takeEvery } from 'redux-saga/effects';

import { authActions } from '../slices/auth';
import { toastActions } from '../slices/toast';
import toastTypes from '@/constants/toastTypes';

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function* signIn(action) {
  const { email, password } = action.payload;
  try {
    const userCredential = yield call(signInWithEmailAndPassword, auth, email, password);
    const user = userCredential.user;
    
    yield put(authActions.postSignInSucc({ userData: user }));
    yield put(
      toastActions.showToast({
        type: toastTypes.SIGN_IN_SUCC,
      }),
    );
  } catch (error) {
    yield put(
      authActions.postSignInFail({
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
    yield put(
      toastActions.showToast({
        type: toastTypes.SIGN_IN_FAIL,
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
  }
}

function* signUp(action) {
  const { email, password, name } = action.payload;
  try {
    const userCredential = yield call(createUserWithEmailAndPassword, auth, email, password);
    const user = userCredential.user;
    yield call(updateProfile, user, {
      displayName: name,
    });

    yield put(authActions.postSignUpSucc());
    yield put(toastActions.showToast({ type: toastTypes.SIGN_UP_SUCC }));
  } catch (error) {
    yield put(
      authActions.postSignUpFail({
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
    yield put(
      toastActions.showToast({
        type: toastTypes.SIGN_UP_FAIL,
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
  }
}

function* googleSignIn() {
  try {
    const result = yield call(signInWithPopup, auth, googleProvider);
    const user = result.user;
    yield put(authActions.postGoogleSignInSucc({ user }));
    yield put(toastActions.showToast({ type: toastTypes.SIGN_IN_SUCC }));
  } catch (error) {
    yield put(
      authActions.postGoogleSignInFail({
        error_code: error.code,
        error_message: error.message,
      }),
    );
    yield put(
      toastActions.showToast({
        type: toastTypes.SIGN_IN_FAIL,
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
  }
}

function* facebookSignIn() {
  try {
    const result = yield call(signInWithPopup, auth, facebookProvider);
    const user = result.user;
    yield put(authActions.postFacebookSignInSucc({ user }));
    yield put(toastActions.showToast({ type: toastTypes.SIGN_IN_SUCC }));
  } catch (error) {
    yield put(
      authActions.postFacebookSignInFail({
        error_code: error.code,
        error_message: error.message,
      }),
    );
    yield put(
      toastActions.showToast({
        type: toastTypes.SIGN_IN_FAIL,
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
  }
}

function* signOut() {
  try {
    yield call(signOut, auth);
    yield put(authActions.postSignOutSucc());
    yield put(toastActions.showToast({ type: toastTypes.SIGN_OUT_SUCC }));
  } catch (error) {
    yield put(
      authActions.postSignOutFail({
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
    yield put(
      toastActions.showToast({
        type: toastTypes.SIGN_OUT_FAIL,
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
  }
}

function* getUserData() {
  try {
    const user = auth.currentUser;
    yield put(authActions.getUserDataSucc({ userData: user }));
    yield put(toastActions.showToast({ type: toastTypes.GET_DATA_SUCC }));
  } catch (error) {
    yield put(
      authActions.getUserDataFail({
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
    yield put(
      toastActions.showToast({
        type: toastTypes.GET_DATA_FAIL,
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
  }
}

function* putUserData(action) {
  const { userData } = action.payload;
  try {
    const user = auth.currentUser;
    if (userData.displayName) {
      yield call(updateProfile, user, { displayName: userData.displayName });
    }
    if (userData.photoURL) {
      yield call(updateProfile, user, { photoURL: userData.photoURL });
    }
    if (userData.email) {
      yield call(updateEmail, user, userData.email);
    }

    yield put(authActions.putUserDataSucc({ userData }));
    yield put(toastActions.showToast({ type: toastTypes.UPDATE_DATA_SUCC }));
  } catch (error) {
    yield put(
      authActions.putUserDataFail({
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
    yield put(
      toastActions.showToast({
        type: toastTypes.UPDATE_DATA_FAIL,
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
  }
}

function* deleteUserData() {
  try {
    yield deleteUser(auth.currentUser);
    yield put(authActions.deleteUserSucc());
    yield put(toastActions.showToast({ type: toastTypes.DELETE_USER_SUCC }));
  } catch (error) {
    yield put(
      authActions.deleteUserFail({
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
    yield put(
      toastActions.showToast({
        type: toastTypes.DELETE_USER_FAIL,
        error: {
          error_code: error.code,
          error_message: error.message,
        },
      }),
    );
  }
}

export default [
  takeEvery(authActions.postSignIn.type, signIn),
  takeEvery(authActions.postSignUp.type, signUp),
  takeEvery(authActions.postSignOut.type, signOut),
  takeEvery(authActions.putUserData.type, putUserData),
  takeEvery(authActions.postGoogleSignIn.type, googleSignIn),
  takeEvery(authActions.postFacebookSignIn.type, facebookSignIn),
  takeEvery(authActions.deleteUser.type, deleteUserData),
  takeEvery(authActions.getUserData.type, getUserData),
];
