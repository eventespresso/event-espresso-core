import { Card, EditableText, Elevation, H4, H6 } from '@blueprintjs/core/lib/esm';
import DeleteTicketButton from './DeleteTicketButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/TicketPriceCalculatorButton';
import useTicketItem from '../../containers/queries/useTicketItem';
import useUpdateTicketMutation from '../../containers/mutations/useUpdateTicketMutation';
import CurrencyInput from '../../../shared/CurrencyInput';
import useRelations from '../../../../infrastructure/services/relations/useRelations';
import DatetimeId from '../DatetimeId';

const console = window.console;

const cardStyle = {
	margin: '0 0 2rem',
	minWidth: '360px',
	position: 'relative',
	textAlign: 'center',
	width: '32%',
};

const btnsStyle = {
	bottom: '.5rem',
	position: 'absolute',
	right: '.5rem',
	textAlign: 'right',
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
	const ticket = useTicketItem({ id });
	const updateTicketField = useUpdateTicketMutation({ id });
	const { getRelations } = useRelations();
	// get related datetimes for this datetime
	const relatedDates = getRelations({
		entity: 'tickets',
		entityId: id,
		relation: 'datetimes',
	}).map((datetimeId) => <DatetimeId key={datetimeId} id={datetimeId} />);

	return (
		<Card elevation={Elevation.ONE} style={cardStyle}>
			<div>
				<div style={idStyle}>
					{ticket.ticketId} {':'} {ticket.id}
				</div>
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
					<CurrencyInput
						id={ticket.id}
						amount={ticket.price}
						placeholder={'set price...'}
						onConfirm={({ amount }) => updateTicketField({ price: amount })}
					/>
				</H4>
			</div>
			<div style={btnsStyle}>
				<TicketPriceCalculatorButton ticket={ticket} />
				<DeleteTicketButton datetimeIn={datetimeIn} id={ticket.id} />
			</div>
			<div>
				{'Related Dates: '} {relatedDates}
			</div>
			<DeleteTicketButton datetimeIn={datetimeIn} id={ticket.id} />
		</Card>
	);
};

export default TicketCard;
