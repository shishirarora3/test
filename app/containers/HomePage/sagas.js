/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, race } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';

// Individual exports for testing
export function* getGithubData() {
  while (true) { // eslint-disable-line no-constant-condition
    const watcher = yield race({
      loadRepos: take(LOAD_REPOS),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const username = yield select(selectUsername());
    const requestURL = 'https://travel.paytm.com/api/hotels/v1/available?&check_in_date=2016-06-09&check_out_date=2016-06-28&city=Goa&client=mWeb&filter_params=%7B%7D&num_rooms=1&page=0&rooms_details=%5B%7B%22num_of_adults%22:%221%22,%22num_of_children%22:0,%22child_ages%22:%5B%5D%7D%5D&size=20';

    // Use call from redux-saga for easier testing
    const repos = yield call(request, requestURL);

    // We return an object in a specific format, see utils/request.js for more information
    if (repos.err === undefined || repos.err === null) {
      yield put(reposLoaded(repos.data, username));
    } else {
      console.log(repos.err.response); // eslint-disable-line no-console
      yield put(repoLoadingError(repos.err));
    }
  }
}

// Bootstrap sagas
export default [
  getGithubData,
];
