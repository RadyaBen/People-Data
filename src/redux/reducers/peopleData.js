import * as actionTypes from '../actionTypes/peopleListType';

const initialState = {
	peopleData: [],
	peopleDataLoadingStatus: 'idle',
}

const peopleData = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PEOPLE_DATA_FETCHING:
			return {
				...state,
				peopleDataLoadingStatus: 'loading'
			}
		case actionTypes.PEOPLE_DATA_FETCHED:
			return {
				...state,
				peopleData: action.payload,
				peopleDataLoadingStatus: 'idle'
			}
		case actionTypes.PEOPLE_DATA_FETCHING_ERROR:
			return {
				...state,
				peopleDataLoadingStatus: 'error'
			}
		default: 
			return state
	}
}

export default peopleData;