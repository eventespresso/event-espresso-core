// @ts-nocheck
import React from 'react';
import { Card, EditableText, Elevation, H4, H6 } from '@blueprintjs/core/lib/esm';
import { __ } from '@wordpress/i18n';

import TicketProvider from '../../../services/context/TicketContext';
import EditTicketButton from './EditTicketButton';
import DeleteTicketButton from './DeleteTicketButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import useTicketItem from '../../../services/apollo/queries/tickets/useTicketItem';
import CurrencyInput from '../../../../../application/ui/input/currencyInput/CurrencyInput';
import { useEntityMutator, EntityType } from '../../../../../application/services/apollo/mutations';
import useRelations from '../../../../../application/services/apollo/relations/useRelations';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import DatetimeIdTag from '../../datetimes/DatetimeIdTag';
import InlineEditInput from '../../../../../application/ui/input/inlineEditInput/InlineEditInput';
import { ListItemProps } from '../../../../../../domain/eventEditor/interfaces/types';
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
				<EditTicketButton position='top' />
				<div>
					<div style={idStyle}>
						{ticket.dbId} {':'} {ticket.id}
					</div>
					<H4>
						<InlineEditInput
							component={EditableText}
							placeholder={__('edit title...')}
							value={ticket.name}
							onCancel={(value: any): void => {
								console.log('value', value);
							}}
							onConfirm={(name: string): void => {
								if (name !== ticket.name) {
									updateEntity({ name });
								}
							}}
							minWidth={320}
							selectAllOnFocus
						/>
					</H4>
				</div>
				<div>
					<H6>
						<InlineEditInput
							component={EditableText}
							placeholder={__('Edit description...')}
							value={ticket.description}
							onCancel={(value: any): void => {
								console.log('value', value);
							}}
							onConfirm={(description: string): void => {
								if (description !== ticket.description) {
									updateEntity({ description });
								}
							}}
							minWidth={320}
							selectAllOnFocus
						/>
					</H6>
				</div>
				<div>
					<H4 style={priceStyle}>
						<CurrencyInput
							id={ticket.id}
							amount={parseFloat(ticket.price)}
							placeholder={__('set price...')}
							onConfirm={({ amount: price }: any): void => {
								if (price !== ticket.price) {
									updateEntity({ price });
								}
							}}
						/>
					</H4>
				</div>
				<div style={btnsStyle}>
					{/* Hide price calculator unless prices are loaded */}
					{/* Delete button should also be hidden to avoid relational inconsistencies */}
					{isLoaded(TypeName.prices) && (
						<>
							<TicketPriceCalculatorButton ticketId={ticket.id} />
							<DeleteTicketButton id={ticket.id} />
						</>
					)}
				</div>
				<div>
					{__('Related Dates:')}{' '}
					{relatedDates.filter(Boolean).map((datetimeId) => (
						<DatetimeIdTag key={datetimeId} id={datetimeId} />
					))}
				</div>
			</Card>
		</TicketProvider>
	) : null;
};

export default TicketCard;
