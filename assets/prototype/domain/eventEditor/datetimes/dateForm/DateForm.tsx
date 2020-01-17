import React, { useContext, CSSProperties } from 'react';
import Currency from 'react-currency-formatter';
import { Field } from 'react-final-form';
import { H2, H4 } from '@blueprintjs/core/lib/esm';
import { renderToString } from '@wordpress/element';
import RelationsSelector from '../../../shared/RelationsSelector';

import { DateTimeContext } from '../../context/DateTimeProvider';
import useDatetimeItem from '../../data/queries/datetimes/useDatetimeItem';
import { DateItemFormProps } from '../types';

const hdrStyle: CSSProperties = {
	margin: '1em 0 .5em 24%',
};

const lblStyle: CSSProperties = {
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

const inputStyle: CSSProperties = {
	boxSizing: 'border-box',
	display: 'inline-block',
	fontSize: '1em',
	lineHeight: '2rem',
	minWidth: '200px',
	width: '60%',
};

const divStyle: CSSProperties = {
	boxSizing: 'border-box',
	display: 'block',
	margin: '0 0 1em',
	width: '100%',
};

const relationsStyle: CSSProperties = {
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
const formatSecondaryField = (ticketPrice: number, toString = false): JSX.Element => {
	return toString ? renderToString(<Currency quantity={ticketPrice} />, null) : <Currency quantity={ticketPrice} />;
};

const DateForm: React.FC<DateItemFormProps> = ({ formReset, relatedTickets, tickets = [], title }): JSX.Element => {
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
						render={({ input }): JSX.Element => (
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
