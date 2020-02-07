// @ts-nocheck
import React from 'react';
import { EditableText, H4, H6 } from '@blueprintjs/core/lib/esm';
import { __ } from '@wordpress/i18n';

import EditTicketButton from './EditTicketButton';
import DeleteTicketButton from './DeleteTicketButton';
import TicketPriceCalculatorButton from '../ticketPriceCalculator/buttons/TicketPriceCalculatorButton';
import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';
import TicketProvider from '@edtrServices/context/TicketContext';
import { CurrencyInput, InlineEditInput } from '@appInputs';
import { useEntityMutator, EntityType } from '@appServices/apollo/mutations';
import useRelations from '@appServices/apollo/relations/useRelations';
import { useStatus, TypeName } from '@appServices/apollo/status';
import EntityPaperFrame from '@appLayout/EntityPaperFrame';
import DatetimeIdTag from '../../datetimes/DatetimeIdTag';
import { ListItemProps } from '../../../interfaces/types';
import { priceStyle, btnsStyle } from './styles';

const TicketCard: React.FC<ListItemProps> = ({ id }) => {
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
			<EntityPaperFrame entity={ticket}>
				<EditTicketButton position='top' />
				<div>
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
			</EntityPaperFrame>
		</TicketProvider>
	) : null;
};

export default TicketCard;
