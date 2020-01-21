// @ts-nocheck
import React from 'react';
import { Card, EditableText, Elevation, H4, H6 } from '@blueprintjs/core/lib/esm';

import TicketProvider from '../../context/TicketProvider';
import EditTicket from './EditTicket';
import DeleteTicketButton from './DeleteTicketButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/TicketPriceCalculatorButtonData';
import useTicketItem from '../../data/queries/tickets/useTicketItem';
import CurrencyInput from '../../../../application/ui/components/input/CurrencyInput';
import { useEntityMutator, EntityType, MutationResult } from '../../../../application/services/apollo/mutations';
import useRelations from '../../../../application/services/apollo/relations/useRelations';
import { useStatus, TypeName } from '../../../../application/services/apollo/status';
import DatetimeIdTag from '../../datetimes/DatetimeIdTag';
import InlineEditInput from '../../../../application/ui/components/input/InlineEditInput';
import { ListItemProps } from '../../types';
import { cardStyle, idStyle, priceStyle, btnsStyle } from './styles';

const TicketCard: React.FC<ListItemProps> = ({ id }): JSX.Element => {
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
							onCancel={(value: any): void => {
								console.log('TicketProvider title onCancel => NEEDS CALLBACK');
								console.log('value', value);
							}}
							onConfirm={(name: string): MutationResult => updateEntity({ name })}
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
							onCancel={(value: any): void => {
								console.log('TicketProvider desc onCancel => NEEDS CALLBACK');
								console.log('value', value);
							}}
							onConfirm={(description: string): MutationResult => updateEntity({ description })}
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
							onConfirm={({ amount }: any): void => {
								updateEntity({ price: amount });
							}}
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
					{relatedDates.filter(Boolean).map((datetimeId) => (
						<DatetimeIdTag key={datetimeId} id={datetimeId} />
					))}
				</div>
			</Card>
		</TicketProvider>
	) : null;
};

export default TicketCard;
