import { Card, EditableText, Elevation, H4, H6 } from '@blueprintjs/core/lib/esm';
import TicketProvider from '../../context/TicketProvider';
import EditTicket from './EditTicket';
import DeleteTicketButton from './DeleteTicketButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/TicketPriceCalculatorButtonData';
import useTicketItem from '../../data/queries/tickets/useTicketItem';
import CurrencyInput from '../../../../application/ui/components/input/CurrencyInput';
import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';
import DatetimeId from '../../datetimes/DatetimeId';
import InlineEditInput from '../../../../application/ui/components/input/InlineEditInput';

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

const TicketCard = ({ id }) => {
	const ticket = useTicketItem({ id });
	const { isLoaded } = useStatus();
	const { updateEntity } = useEntityMutator(EntityType.Ticket, id);
	const { getRelations } = useRelations();
	// get related datetimes for this datetime
	const relatedDates = getRelations({
		entity: 'tickets',
		entityId: id,
		relation: 'datetimes',
	});
	return ticket ? (
		<TicketProvider id={ticket.id}>
			<Card elevation={Elevation.ONE} style={cardStyle}>
				<EditTicket position='top' relatedDates={relatedDates} />
				<div>
					<div style={idStyle}>
						{ticket.dbId} {':'} {ticket.id}
					</div>
					<H4>
						<InlineEditInput
							component={EditableText}
							placeholder={'edit title...'}
							defaultValue={ticket.name}
							value={ticket.name}
							onCancel={(value) => {
								console.log('TicketProvider title onCancel => NEEDS CALLBACK');
								console.log('value', value);
							}}
							onConfirm={(name) => updateEntity({ name })}
							minWidth={'320px'}
							selectAllOnFocus
						/>
					</H4>
				</div>
				<div>
					<H6>
						<InlineEditInput
							component={EditableText}
							placeholder='Edit description...'
							value={ticket.description}
							defaultValue={ticket.description}
							onCancel={(value) => {
								console.log('TicketProvider desc onCancel => NEEDS CALLBACK');
								console.log('value', value);
							}}
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
					{isLoaded(TypeName.prices) && (
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
	) : null;
};

export default TicketCard;
