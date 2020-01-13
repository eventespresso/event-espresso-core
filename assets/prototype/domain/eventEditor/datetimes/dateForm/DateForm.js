import { useContext } from 'react';
import Currency from 'react-currency-formatter';
import { Field } from 'react-final-form';
import { H2, H4 } from '@blueprintjs/core/lib/esm';
import { renderToString } from '@wordpress/element';
import RelationsSelector from '../../../shared/RelationsSelector';

import { DateTimeContext } from '../../context/DateTimeProvider';
import useDatetimeItem from '../../data/queries/datetimes/useDatetimeItem';

const hdrStyle = {
	margin: '1em 0 .5em 24%',
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
	width: '24%',
};

const inputStyle = {
	boxSizing: 'border-box',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '200px',
	width: '60%',
};

const divStyle = {
	boxSizing: 'border-box',
	display: 'block',
	margin: '0 0 1em',
	width: '100%',
};

const relationsStyle = {
	boxSizing: 'border-box',
	display: 'inline-block',
	marginLeft: '24%',
	padding: '.5em 0 1em',
	width: '60%',
};

/**
 * @function
 * @param {number} ticketPrice
 * @param {boolean} toString
 * @return {node|string} rendered ticket price
 */
const formatSecondaryField = (ticketPrice, toString = false) => {
	return toString ? renderToString(<Currency quantity={ticketPrice} />, null) : <Currency quantity={ticketPrice} />;
};

const DateForm = ({ formReset, relatedTickets, tickets = [], title }) => {
	const { id } = useContext(DateTimeContext);
	const { description = '', name = '' } = useDatetimeItem({ id }) || {};

	return (
		<>
			<H2 style={hdrStyle}>{title}</H2>
			<div style={divStyle}>
				<label style={lblStyle}>Name</label>
				<Field
					defaultValue={name}
					name='name'
					component='input'
					type='text'
					placeholder='Name'
					style={inputStyle}
				/>
			</div>
			<div style={divStyle}>
				<label style={lblStyle}>Description</label>
				<Field
					name='description'
					component='input'
					type='text'
					placeholder='description'
					style={inputStyle}
					defaultValue={description}
				/>
			</div>
			<H4 style={{ margin: '1.5em 0 0 24%' }}>Ticket Assignments</H4>
			<div style={divStyle}>
				<div style={relationsStyle}>
					<Field
						name={'tickets'}
						render={({ input }) => (
							<RelationsSelector
								defaultRelatedItems={relatedTickets}
								items={tickets}
								itemType={'ticket'}
								displayFields={['name', 'price']}
								placeholder={'select tickets this datetime gives access to'}
								formatFields={[null, formatSecondaryField]}
								formReset={formReset}
								{...input}
							/>
						)}
					/>
				</div>
			</div>
		</>
	);
};

export default DateForm;
