import React from 'react';
import Currency from 'react-currency-formatter';
import { Field } from 'react-final-form';
import { H2, H4 } from '@blueprintjs/core/lib/esm';
import { renderToString } from '@wordpress/element';

import RelationsSelector from '../../../shared/ui/RelationsSelector';
import useDatetimeItem from '../../data/queries/datetimes/useDatetimeItem';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import parsedAmount from '../../../../application/utilities/money/parsedAmount';
import { DateItemFormProps } from '../types';
import { hdrStyle, lblStyle, inputStyle, divStyle, relationsStyle } from './style';

const formatSecondaryField = (ticketPrice: number | string, toString = false): JSX.Element => {
	const priceAmount = parsedAmount(ticketPrice);
	return toString ? renderToString(<Currency quantity={priceAmount} />, null) : <Currency quantity={priceAmount} />;
};

const DateForm: React.FC<DateItemFormProps> = ({ id, formReset, title }): JSX.Element => {
	const { description = '', name = '' } = useDatetimeItem({ id }) || {};
	const { getRelations } = useRelations();
	const tickets = useDatetimes();

	const relatedTicketIds = id
		? getRelations({
				entity: 'datetimes',
				entityId: id,
				relation: 'tickets',
		  })
		: [];

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
								defaultRelatedItems={relatedTicketIds}
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
