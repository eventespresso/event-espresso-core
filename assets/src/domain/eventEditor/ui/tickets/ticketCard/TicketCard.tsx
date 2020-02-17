// @ts-nocheck
import React, { CSSProperties } from 'react';
import { EditableText, H4, H6 } from '@blueprintjs/core/lib/esm';
import { __ } from '@wordpress/i18n';

import TicketActionsMenu from './TicketActionsMenu';
import TicketDetails from './TicketDetails';
import useTicketItem from '@edtrServices/apollo/queries/tickets/useTicketItem';
import TicketProvider from '@edtrServices/context/TicketContext';
import { CurrencyInput, InlineEditInput } from '@appInputs';
import useRelations from '@appServices/apollo/relations/useRelations';
import EntityPaperFrame from '@appLayout/EntityPaperFrame';
import DatetimeIdTag from '../../datetimes/DatetimeIdTag';
import { ListItemProps } from '../../../interfaces/types';
import { priceStyle } from './styles';
import { useTicketMutator } from '@edtrServices/apollo/mutations';

const menuWrapperStype: CSSProperties = {
	alignItems: 'stretch',
	boxSizing: 'border-box',
	flex: '0, 0, 3rem',
	padding: '.5rem',
};
const menuStype: CSSProperties = {
	display: 'flex',
	flexWrap: 'wrap',
	position: 'absolute',
	right: '0.5em',
	flexDirection: 'column',
	top: '0.5em',
};

const btnStyle: CSSProperties = {
	background: 'var(--ee-background-color)',
	border: '1px solid var(--ee-color-grey-8)',
	color: 'var(--ee-color-black)',
	margin: '0 0 .5rem',
};

const TicketCard: React.FC<ListItemProps> = ({ id }) => {
	const ticket = useTicketItem({ id });
	const { updateEntity } = useTicketMutator(id);
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
				<div>
					{__('Related Dates:')}{' '}
					{relatedDates.filter(Boolean).map((datetimeId) => (
						<DatetimeIdTag key={datetimeId} id={datetimeId} />
					))}
				</div>
				<div style={menuWrapperStype}>
					<TicketActionsMenu entity={ticket} menuItemProps={{ style: btnStyle }} style={menuStype} />
				</div>
				<TicketDetails ticket={ticket} updateTicket={updateEntity} />
			</EntityPaperFrame>
		</TicketProvider>
	) : null;
};

export default TicketCard;
