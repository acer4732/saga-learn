import { LOCATION_CHANGE } from 'connected-react-router';
import { matchPath } from 'react-router';
import {apply, call, fork, put, select, take, takeEvery} from 'redux-saga/effects';
import { getRoutesConfig, MAIN_ROUTE, PEOPLE_DETAILS_ROUTE } from '../../../routes';
import { LOAD_USERS, LOAD_USERS_SUCCESS } from "../../reducers/people/actions";
import { LOAD_USER_DETAILS, LOAD_USER_DETAILS_FAILURE, LOAD_USER_DETAILS_SUCCESS } from "../../reducers/peopleDetails/actions";
import { selectPeople } from '../../reducers/people/selectors';

export function* loadPeopleDetails({ payload }) {
  const { id } = payload;

  try {
    const request = yield call(fetch, `https://swapi.dev/api/people/${id}`);
    const data = yield apply(request, request.json);
  
    yield put({
      type: LOAD_USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch(err) {
    yield put({
      type: LOAD_USER_DETAILS_FAILURE,
      payload: err,
    })
  }
}

export function* loadPeopleList({ payload }) {
  const { page, search } = payload;
  const request = yield call(fetch, `https://swapi.dev/api/people?page=${page}&search=${search}`);
  const data = yield apply(request, request.json);

  yield put({
    type: LOAD_USERS_SUCCESS,
    payload: data,
  })
}

export function* routeChangeSaga() {
  while (true) {
    const action = yield take(LOCATION_CHANGE);

    const mainPage = matchPath(action.payload.location.pathname, getRoutesConfig(MAIN_ROUTE));

    if (mainPage) {
      const state = yield select(selectPeople);
      const {page, search} = state;

      yield put({
        type: LOAD_USERS,
        payload: {
          page,
          search,
        }
      });
    }

    const detailsPage = matchPath(action.payload.location.pathname, getRoutesConfig(PEOPLE_DETAILS_ROUTE));

    if(detailsPage) {
      const {id} = detailsPage.params;

      if(id) {
        yield put({
          type: LOAD_USER_DETAILS,
          payload: {
            id
          }
        });
      }
    }
  }
}

export default function* peopleSaga() {
  yield fork(routeChangeSaga);
  yield takeEvery(LOAD_USERS, loadPeopleList);
  yield takeEvery(LOAD_USER_DETAILS, loadPeopleDetails);
}