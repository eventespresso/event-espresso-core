import React from 'react';
import { Field } from 'react-final-form';
import { H2, H4 } from '@blueprintjs/core/lib/esm';

import RelationsSelector from '../../../shared/ui/RelationsSelector';
import useTicketItem from '../../data/queries/tickets/useTicketItem';
import useDatetimes from '../../data/queries/datetimes/useDatetimes';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import { TicketItemFormProps } from '../types';
import { hdrStyle, lblStyle, inputStyle, divStyle, relationsStyle } from './style';

const TicketForm: React.FC<TicketItemFormProps> = ({ id, formReset, title }): JSX.Element => {
	const { description = '', name = '', price = '' } = useTicketItem({ id }) || {};
	const { getRelations } = useRelations();
	const datetimes = useDatetimes();

	const relatedDatetimeIds = id
		? getRelations({
				entity: 'tickets',
				entityId: id,
				relation: 'datetimes',
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
					defaultValue={description}
					name='description'
					component='input'
					type='text'
					placeholder='description'
					style={inputStyle}
				/>
			</div>
			<div style={divStyle}>
				<label style={lblStyle}>Price</label>
				<Field
					defaultValue={price}
					name='price'
					component='input'
					type='number'
					placeholder='ticket price'
					style={inputStyle}
					min={0}
					required
				/>
			</div>
			<H4 style={{ margin: '1.5em 0 0 24%' }}>Date Assignments</H4>
			<div style={divStyle}>
				<div style={relationsStyle}>
					<Field
						name={'datetimes'}
						render={({ input }): JSX.Element => (
							<RelationsSelector
								defaultRelatedItems={relatedDatetimeIds}
								items={datetimes}
								itemType={'datetime'}
								displayFields={['name', 'startDate']}
								placeholder={'select datetimes this ticket has access to'}
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

export default TicketForm;
