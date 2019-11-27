import Currency from 'react-currency-formatter';
import { useState } from '@wordpress/element';
import { Button, Card, EditableText, Elevation, H4, H6 } from '@blueprintjs/core/lib/esm';
import DeleteTicketButton from './DeleteTicketButton';
import useTicketItem from '../../containers/queries/useTicketItem';
import useUpdateTicketMutation from '../../containers/mutations/useUpdateTicketMutation';

const console = window.console;

const btnStyle = {
	margin: '0 0 0 .5rem',
};

const cardStyle = {
	margin: '0 0 2rem',
	minWidth: '360px',
	position: 'relative',
	textAlign: 'center',
	width: '32%',
};

const idStyle = {
	color: 'grey',
	fontSize: '9px',
	left: '.75em',
	position: 'absolute',
	top: '.5em',
};

const priceStyle = {
	color: 'grey',
};

const TicketCard = ({ datetimeIn, id }) => {
	const [editing, setEditing] = useState(false);
	const ticket = useTicketItem({ id });
	const updateTicketField = useUpdateTicketMutation({ id });

	const ticketPrice = editing ? (
		<EditableText
			isEditing={editing}
			placeholder={'set price...'}
			defaultValue={ticket.price}
			onCancel={() => setEditing(false)}
			onConfirm={(price) => updateTicketField({ price })}
			selectAllOnFocus
		/>
	) : (
		<Currency quantity={ticket.price} />
	);

	return (
		<Card elevation={Elevation.ONE} style={cardStyle}>
			<div>
				<div style={idStyle}>{ticket.ticketId}</div>
				<H4>
					<EditableText
						placeholder={'edit title...'}
						defaultValue={ticket.name}
						onCancel={(value) => console.log(value)}
						onConfirm={(name) => updateTicketField({ name })}
						minWidth={'320px'}
						selectAllOnFocus
					/>
				</H4>
			</div>

			<div>
				<H6>
					<EditableText
						placeholder='Edit description...'
						defaultValue={ticket.description}
						onCancel={(value) => console.log(value)}
						onConfirm={(description) => updateTicketField({ description })}
						minWidth={'320px'}
						selectAllOnFocus
					/>
				</H6>
			</div>

			<div>
				<H4 style={priceStyle}>
					{ticketPrice}
					<Button icon='edit' onClick={() => setEditing(true)} style={btnStyle} minimal />
				</H4>
			</div>
			<DeleteTicketButton datetimeIn={datetimeIn} id={ticket.id} />
		</Card>
	);
};

export default TicketCard;
