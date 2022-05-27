import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPeopleData } from '../../redux/actions/peopleList';
import FilterPeopleList from '../FilterPeopleList/FilterPeopleList';
import SearchMessage from '../../components/SearchMessage/SearchMessage';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../../components/ErrorMessage/ErrorMessage';

import './PeopleList.scss';

const PeopleList = () => {
	const [filteredPeopleData, setFilteredPeopleData] = useState([]);
	const { peopleData, peopleDataLoadingStatus } = useSelector(state => state.peopleData);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPeopleData());
	}, []);

	useEffect(() => {
		setFilteredPeopleData(peopleData);
	}, [peopleData]);

	if (peopleDataLoadingStatus === 'loading') {
		return <Spinner />
	} else if (peopleDataLoadingStatus === 'error') {
		return <Error />
	}

	const onFilterChanged = (filter) => {
		let filteredList = peopleData;

		Object.keys(filter).map(key => {
			const filterValue = filter[key];

			if (typeof filterValue === 'string') {
				filteredList = filteredList.filter(person =>
					!filterValue ? true : person[key].toString().toLowerCase().indexOf(filterValue.toLowerCase()) > -1);
			} else if (Array.isArray(filterValue)) {
				filteredList = filteredList.filter(person =>
					filterValue.length === 0 ? true : filterValue.indexOf(person[key]) > -1);
			}
		});

		setFilteredPeopleData(filteredList);
	}

	return (
		<>
			<FilterPeopleList onFilterChanged={onFilterChanged} />
			{filteredPeopleData.length === 0
				? <SearchMessage />
				: <div className="people-container">
						{filteredPeopleData.map((person, index) => (
							<li key={index} className='people_list'>
								<span>{person.name} {person.lastname}</span>
								<span>Age: {person.age}</span>
								<span>Gender: {person.sex}</span>
							</li>
						))}
				  </div>
			}
		</>
	)
}

export default PeopleList;