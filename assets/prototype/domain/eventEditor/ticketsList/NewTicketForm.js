import { Fragment } from '@wordpress/element';
import { Field } from 'react-final-form';
import { useState } from '@wordpress/element';
import { Button, H2, H4, MenuItem } from '@blueprintjs/core/lib/esm';
import { MultiSelect } from '@blueprintjs/select';

const hdrStyle = {
	margin: '1em 0 .5em 24%'
};

const lblStyle = {
	boxSizing: 'border-box',
	color: 'grey',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '80px',
	paddingRight: '1em',
	textAlign: 'right',
	verticalAlign: 'top',
	width: '24%'
};

const inputStyle = {
	boxSizing: 'border-box',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '200px',
	width: '60%'
};

const divStyle = {
	boxSizing: 'border-box',
	display: 'block',
	margin: '0 0 1em',
	width: '100%'
};

const datesStyle = {
	boxSizing: 'border-box',
	display: 'inline-block',
	marginLeft: '24%',
	padding: '.5em 0 1em',
	width: '60%'
};

const NewTicketForm = ({ datetimes }) => {
	const [relatedDates, setRelatedDates] = useState([]);
	console.log(
		'%c NewTicketForm: %c > datetimes: ',
		'color: #F2F500; font-size:14px;',
		'color: #BCBDAC;',
		datetimes
	);
	console.log('%c > relatedDates: ', 'color: #BCBDAC;', relatedDates);

	const hasRelation = (datetime, log = true) => {
		if (log) {
			console.log(
				'%c > datetime ' + datetime.datetimeId + ' hasRelation: ',
				'color: violet;',
				relatedDates.indexOf(datetime.id) > -1
			);
		}
		return relatedDates.indexOf(datetime.id) > -1;
	};

	const handleDateRelation = (datetime) => {
		console.log('%c > : ', 'color: #BCBDAC;');
		console.log(
			'%c handleDateRelation %c > datetime.id: ' + datetime.id,
			'color: SkyBlue; ',
			'color: LightSkyBlue;'
		);
		if (hasRelation(datetime)) {
			removeDateRelation(datetime);
		} else {
			assignDateRelation(datetime);
		}
	};

	const assignDateRelation = (datetime) => {
		console.log(
			'%c assignDateRelation %c > datetime.id : ' + datetime.id,
			'color:YellowGreen; font-size: 14px;',
			'color:lime;'
		);
		const newDates = [...relatedDates, datetime.id];
		console.log('%c > newDates: ', 'color:lime;', newDates);
		setRelatedDates(newDates);
	};

	const removeDateRelation = (datetime) => {
		const datetimeId = datetime.id ? datetime.id : datetime;
		console.log(
			'%c removeDateRelation > datetimeId: ' + datetimeId,
			'color: Tomato; font-size: 14px;'
		);
		console.log('%c > relatedDates: ', 'color: blue;', relatedDates);
		const newDates = relatedDates.filter((id) => id !== datetimeId);
		console.log('%c > newDates: ', 'color: Tomato;', newDates);
		setRelatedDates(newDates);
	};

	const handleTagRemove = (tag, index) => {
		console.log(
			'%c handleTagRemove %c > ' + index + ' ) ' + tag,
			'color: orange; font-size: 14px;'
		);
		const datetime = relatedDates[index];
		console.log('%c > datetime: ', 'color: #BCBDAC;', datetime);
		if (datetime) {
			removeDateRelation(datetime);
		}
	};

	const relatedDateOption = (datetime) => {
		const { datetimeId, name, startDate } = datetime;
		return (
			<MenuItem
				icon={hasRelation(datetime, false) ? 'tick' : 'blank'}
				key={datetime.id}
				label={startDate}
				onClick={() => handleDateRelation(datetime)}
				text={`${datetimeId}) ${name}`}
				shouldDismissPopover={false}
			/>
		);
	};

	const clearButton =
		relatedDates.length > 0 ? (
			<Button icon="cross" onClick={() => setRelatedDates([])} minimal />
		) : (
			undefined
		);

	return (
		<Fragment>
			<H2 style={hdrStyle}>New Ticket Details</H2>
			<div style={divStyle}>
				<label style={lblStyle}>Name</label>
				<Field
					name="name"
					component="input"
					type="text"
					placeholder="Name"
					style={inputStyle}
				/>
			</div>
			<div style={divStyle}>
				<label style={lblStyle}>Description</label>
				<Field
					name="description"
					component="input"
					type="text"
					placeholder="description"
					style={inputStyle}
				/>
			</div>
			<div style={divStyle}>
				<label style={lblStyle}>Price</label>
				<Field
					name="price"
					component="input"
					type="text"
					placeholder="ticket price"
					style={inputStyle}
				/>
			</div>
			<H4 style={{ margin: '1.5em 0 0 24%' }}>Date Assignments</H4>
			<div style={divStyle}>
				<div style={datesStyle}>
					<MultiSelect
						items={datetimes}
						selectedItems={datetimes.filter((datetime) =>
							hasRelation(datetime)
						)}
						itemRenderer={relatedDateOption}
						onItemSelect={handleDateRelation}
						tagInputProps={{
							tagProps: { minimal: false },
							onRemove: handleTagRemove,
							rightElement: clearButton
						}}
						tagRenderer={(datetime) => {
							const { datetimeId, name, startDate } = datetime;
							console.log(
								'%c tagRenderer ' +
									datetimeId +
									` ) ${name} : ${startDate}`,
								'color:pink;'
							);
							return `${datetimeId}) ${name} : ${startDate}`;
						}}
						placeholder={'select dates this ticket gives access to'}
						noResults={<MenuItem disabled text={'no results'} />}
						resetOnQuery={false}
						fill
					/>
				</div>
			</div>
			<Field
				type={'hidden'}
				component={'input'}
				name={'dateRelations'}
				value={relatedDates.join()}
			/>
		</Fragment>
	);
};

export default NewTicketForm;
