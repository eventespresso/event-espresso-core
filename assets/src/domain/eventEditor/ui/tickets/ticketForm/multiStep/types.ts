import { Disclosure } from '@application/services/utilities/types';
import { EntityId } from '@dataServices/types';
import { Ticket } from '@edtrServices/apollo/types';
import { FormRenderProps } from 'react-final-form';
import { TicketFormShape } from '../types';

export interface ContainerProps extends Omit<Disclosure, 'onOpen'> {
	ticketId?: EntityId;
}

export interface ContentProps {
	entity: Ticket;
	onClose: VoidFunction;
}

export interface ContentWrapperProps extends FormRenderProps<TicketFormShape> {}
