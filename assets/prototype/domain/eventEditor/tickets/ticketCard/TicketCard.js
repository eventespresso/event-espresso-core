import { Card, EditableText, Elevation, H4, H6 } from '@blueprintjs/core/lib/esm';
import TicketProvider from '../../context/TicketProvider';
import EditTicket from './EditTicket';
import DeleteTicketButton from './DeleteTicketButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/TicketPriceCalculatorButton';
import useTicketItem from '../../data/queries/tickets/useTicketItem';
import CurrencyInput from '../../../../application/ui/components/input/CurrencyInput';
import useEntityMutator from '../../../../application/services/apollo/mutations/useEntityMutator';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import useStatus from '../../../../application/services/apollo/status/useStatus';
import DatetimeId from '../../datetimes/DatetimeId';

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

const TicketCard = ({ datetimes, id }) => {
	const ticket = useTicketItem({ id });
	const { isLoaded } = useStatus();
	const { updateEntity } = useEntityMutator('Ticket', id);
	const { getRelations } = useRelations();
	// get related datetimes for this datetime
	const relatedDates = getRelations({
		entity: 'tickets',
		entityId: id,
		relation: 'datetimes',
	});
	return (
		<TicketProvider id={id}>
			<Card elevation={Elevation.ONE} style={cardStyle}>
				<EditTicket datetimes={datetimes} position='top' relatedDates={relatedDates} />
				<div>
					<div style={idStyle}>
						{ticket.dbId} {':'} {ticket.id}
					</div>
					<H4>
						<EditableText
							placeholder={'edit title...'}
							defaultValue={ticket.name}
							onCancel={(value) => console.log(value)}
							onConfirm={(name) => updateEntity({ name })}
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
							onConfirm={(description) => updateEntity({ description })}
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
							onConfirm={({ amount }) => updateEntity({ price: amount })}
						/>
					</H4>
				</div>
				<div style={btnsStyle}>
					{/* Hide price calculator unless prices are loaded */}
					{/* Delete button should also be hidden to avoid relational inconsistencies */}
					{isLoaded('prices') && (
						<>
							<TicketPriceCalculatorButton ticket={ticket} />
							<DeleteTicketButton id={ticket.id} />
						</>
					)}
				</div>
				<div>
					{'Related Dates: '}{' '}
					{relatedDates.map((datetimeId) => (
						<DatetimeId key={datetimeId} id={datetimeId} />
					))}
				</div>
			</Card>
		</TicketProvider>
	);
};

export default TicketCard;
