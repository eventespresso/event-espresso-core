import Currency from 'react-currency-formatter';
import { useState } from '@wordpress/element';
import {
	Button,
	Card,
	EditableText,
	Elevation,
	H4
} from '@blueprintjs/core/lib/esm';
import DeleteTicketButton from './DeleteTicketButton';
import useTicketItem from '../../containers/queries/useTicketItem';
import useUpdateTicketMutation from '../../containers/mutations/useUpdateTicketMutation';

const console = window.console;

const btnStyle = {
	margin: '0 0 0 .5rem'
};

const cardStyle = {
	margin: '0 0 2rem',
	minWidth: '360px',
	position: 'relative',
	textAlign: 'center',
	width: '32%'
};

const idStyle = {
	color: 'grey',
	fontSize: '9px',
	left: '.75em',
	position: 'absolute',
	top: '.5em'
};

const priceStyle = {
	color: 'grey'
};

const TicketCard = ({ id }) => {
	const [editing, setEditing] = useState(false);
	const ticket = useTicketItem({ id });
	const { updateTicket } = useUpdateTicketMutation();

	const onTitleConfirm = (name) => {
		updateTicket({
			variables: { input: { clientMutationId: 'xyz', id, name } }
		});
	};
	const onPriceConfirm = (price) => {
		updateTicket({
			variables: { input: { clientMutationId: 'xyz', id, price } }
		});
		setEditing(false);
	};
	const ticketPrice = editing ? (
		<EditableText
			isEditing={editing}
			placeholder={'set price...'}
			defaultValue={ticket.price}
			value={ticket.price}
			onCancel={() => setEditing(false)}
			onConfirm={onPriceConfirm}
			selectAllOnFocus
		/>
	) : (
		<Currency quantity={ticket.price} />
	);
	return (
		<Card elevation={Elevation.ONE} style={cardStyle}>
			<div>
				<div style={idStyle}>{ticket.id}</div>
				<H4>
					<EditableText
						placeholder={'edit title...'}
						defaultValue={ticket.name}
						onCancel={(value) => console.log(value)}
						onConfirm={onTitleConfirm}
						minWidth={'320px'}
						selectAllOnFocus
					/>
				</H4>
			</div>
			<div>
				<H4 style={priceStyle}>
					{ticketPrice}
					<Button
						icon="edit"
						onClick={() => setEditing(true)}
						style={btnStyle}
						minimal
					/>
				</H4>
			</div>
			<DeleteTicketButton ticketId={ticket.ticketId} />
		</Card>
	);
};

export default TicketCard;
