import axios from 'axios';
import * as actionTypes from '../actionTypes/peopleListType';

export const fetchPeopleData = () => async (dispatch) => {
	try {
		dispatch(peopleDataFetching());

		const apiUrl = 'https://venbest-test.herokuapp.com';
		const response = await axios.get(apiUrl);

		dispatch(peopleDataFetched(response.data));
	} catch (e) {
		dispatch(peopleDataFetchingError());
	}
}

export const peopleDataFetching = () => {
	return {
		type: actionTypes.PEOPLE_DATA_FETCHING
	}
}

export const peopleDataFetched = (person) => {
	return {
		type: actionTypes.PEOPLE_DATA_FETCHED,
		payload: person
	}
}

export const peopleDataFetchingError = () => {
	return {
		type: actionTypes.PEOPLE_DATA_FETCHING_ERROR
	}
}