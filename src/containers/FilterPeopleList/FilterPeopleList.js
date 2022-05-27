import React, { useState } from 'react';

import './FilterPeopleList.scss';

const FilterPeopleList = ({ onFilterChanged }) => {

	const [filterState, setFilterState] = useState({
		name: '',
		lastname: '',
		age: '',
		sex: [],
	});

	const [genderSelection, setGenderSelection] = useState({
		m: false,
		f: false
	});

	const onTextFilterChanged = (e) => {
		const { name, value } = e.target;

		const newFilter = {
			...filterState,
			[name]: value
		};

		setFilterState(newFilter);

		onFilterChanged(newFilter);
	}

	const onSexSelectionChanged = (e) => {
		const { name, checked } = e.target;

		const newSelection = {
			...genderSelection,
			[name]: checked
		};

		const newFilter = {
			...filterState,
			sex: Object.keys(newSelection).map(k => newSelection[k] ? k : null).filter(i => i !== null)
		};

		setFilterState(newFilter);
		setGenderSelection(newSelection);

		onFilterChanged(newFilter);
	}

	return (
		<div className="filters-container">
			<div className="filters_bar">
				<div className="filters_header">
					<h3 >Filters Bar</h3>
				</div>
				<div className="filters_input">
					<label htmlFor="person-name">First Name: </label>
					<input
						className="person-name"
						name="name"
						type="text"
						value={filterState.name}
						onChange={onTextFilterChanged}
						placeholder="Search by name" />
				</div>
				<div className="filters_input">
					<label htmlFor="person-lastname">Last Name: </label>
					<input
						className="person-lastname"
						name="lastname"
						type="text"
						value={filterState.lastname}
						onChange={onTextFilterChanged}
						placeholder="Search by lastname" />
				</div>
				<div className="filters_input">
					<label htmlFor="person-age">Age: </label>
					<input
						className="person-age"
						name="age"
						type="text"
						value={filterState.age}
						onChange={onTextFilterChanged}
						placeholder="Search by age" />
				</div>
				<div className="filters_input checkboxes">
					<label id="gender">Gender: </label>
					<label>
						<input
							name="m"
							type="checkbox"
							checked={genderSelection.m}
							onChange={onSexSelectionChanged} />
						Male
					</label>
					<label>
						<input
							name="f"
							type="checkbox"
							checked={genderSelection.f}
							onChange={onSexSelectionChanged} />
						Female
					</label>
				</div>
			</div>
		</div>
	)
}

export default FilterPeopleList;