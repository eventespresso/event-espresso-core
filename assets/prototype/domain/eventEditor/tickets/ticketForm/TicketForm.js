import { useContext } from '@wordpress/element';
import { Field } from 'react-final-form';
import { H2, H4 } from '@blueprintjs/core/lib/esm';
import RelationsSelector from '../../../shared/RelationsSelector';

import { TicketContext } from '../../context/TicketProvider';
import useTicketItem from '../../data/queries/tickets/useTicketItem';

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

const TicketForm = ({ datetimes, formReset, relatedDates, title }) => {
	const { id } = useContext(TicketContext);
	const { description = '', name = '', price = '' } = useTicketItem({ id }) || {};

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
						render={({ input }) => (
							<RelationsSelector
								defaultRelatedItems={relatedDates}
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
